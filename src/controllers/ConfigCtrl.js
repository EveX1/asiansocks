/*
 *PACKAGES
 */
import Config from './../Config';

const configClass = new Config();
configClass.getConfig();

export default class ConfigCtrl {

    constructor() {

    }

    index(req, res) {
        if (req.session.connected) {
            res.render('config', {
                title: `Configuration`,
                consumerkey: configClass.getConfigKey('consumerkey'),
                consumersecret: configClass.getConfigKey('consumersecret'),
                token: configClass.getConfigKey('token'),
                tokensecret: configClass.getConfigKey('tokensecret'),
                ip: configClass.getConfigKey('ip'),
                port: configClass.getConfigKey('port'),
                db: configClass.getConfigKey('db')
            })
        } else {
            res.render('unauth');
        }
    }

    form(req, res) {
        Object.keys(req.body).forEach(key => {
            configClass.setConfigKey(key, req.body[key]);
        })
        res.render('config', {
            title: `Configuration`,
            consumerkey: configClass.getConfigKey('consumerkey'),
            consumersecret: configClass.getConfigKey('consumersecret'),
            token: configClass.getConfigKey('token'),
            tokensecret: configClass.getConfigKey('tokensecret'),
            ip: configClass.getConfigKey('ip'),
            port: configClass.getConfigKey('port'),
            db: configClass.getConfigKey('db')
        })
    };

    rendering(req, res) {
        res.render('config', {
            title: `Configuration`,
            consumerkey: configClass.getConfigKey('consumerkey'),
            consumersecret: configClass.getConfigKey('consumersecret'),
            token: configClass.getConfigKey('token'),
            tokensecret: configClass.getConfigKey('tokensecret'),
            ip: configClass.getConfigKey('ip'),
            port: configClass.getConfigKey('port'),
            db: configClass.getConfigKey('db')
        })
    }
}