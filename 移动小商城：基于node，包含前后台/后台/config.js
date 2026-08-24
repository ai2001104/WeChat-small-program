import crypto from 'crypto'

export default {
	secret: process.env.APP_SECRET || crypto.randomBytes(32).toString('hex'),
	mongo: {
		development: {
			connectionString: 'mongodb://127.0.0.1:27017/mall'
		},
		production: {
			connectionString: 'mongodb://127.0.0.1:27017/mall'
		}
	},
	redis: {
		development: {
			connectionString: 'redis://127.0.0.1:6379'
		},
		production: {
			connectionString: 'redis://127.0.0.1:6379',
		}
	},
	upload: {
		tmp : 'public/tmp/',
		path: 'public/uploads/'
	},
	superAdmin: {
		username: process.env.SUPER_ADMIN_USERNAME || 'admin', 
		password: process.env.SUPER_ADMIN_PASSWORD || crypto.randomBytes(16).toString('hex'), 
	},
	orderStatus: {
		'submitted': '已提交', 
		'canceled' : '已取消', 
		'confirmed': '已确认', 
		'finished' : '已完成', 
	},
	wechat: {
		appid: process.env.WECHAT_APPID || '', 
		secret: process.env.WECHAT_SECRET || '', 
	},
}