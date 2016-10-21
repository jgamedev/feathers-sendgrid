'use strict';

import fs from 'fs';
import path from 'path';
import Debug from 'debug';

const debug = new Debug('feathers-sendgrid:render-template');
const defaults = {
  type: 'text/html'
};

export default function renderTemplate (options = {}) {
  options = Object.assign({}, defaults, options);

  if (!options.engine) {
    throw new Error(`You must provide a view engine instance that exposes the 'compile' method via 'options.engine'.`);
  }

  return function (hook) {
    hook.params.template = hook.params.template || {};

    return new Promise((resolve, reject) => {
      let filepath;
      const templateName = hook.params.template.name;
      const templateData = hook.params.template.data || {};
      const extension = options.extension || hook.app.get('view engine');

      if (!templateName) {
        return reject(new Error(`You must provide a template name via 'hook.params.template.name'.`));
      }

      // TODO (EK): Test the filename for the extension

      if (options.path) {
        filepath = path.join(options.path, `${templateName}.${extension}`);
      } else {
        filepath = path.join(hook.app.get('views'), 'emails', `${templateName}.${extension}`);
      }

      debug(`Reading file ${filepath}`);

      fs.readFile(filepath, function (error, file) {
        if (error) {
          return reject(error);
        }

        try {
          debug(`Rendering file ${filepath} with data`, templateData);

          // Compile the template
          const template = options.engine.compile(file.toString());
          const html = template(templateData);

          hook.data.type = options.type;
          hook.data.content = html;

          return resolve(hook);
        } catch (error) {
          debug(`Error rendering email template ${filepath}`, error);
          return reject(error);
        }
      });
    });
  };
}
