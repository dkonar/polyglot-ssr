const fs = require('fs');
import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import { join } from 'path';
const { readFileSync } = fs;
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

import { renderModuleFactory } from '@angular/platform-server';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

export = function render() {
  return renderModuleFactory(AppServerModuleNgFactory, {
    document: template,
    url: "/",
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ],
  })
}
