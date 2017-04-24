/**
 * Created by 15061857 on 2017/4/24.
 * load the config.json file from disk
 */
const fs = require('fs');

const config = JSON.parse(
    fs.readFileSync(
        require('path').resolve(__dirname, '../config.json'), 'utf-8'));

module.exports = {

    /**
     * Returns the configuration for a given section.
     *
     * @param name the section to be returned from the config file..
     */
    load: function (name) {
        return config[name];
    }

};