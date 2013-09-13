Ext.define('JXY.store.Menus', {
	extend : 'Ext.data.TreeStore',
	root : {
		expanded : true
	},
	proxy : {
		type : 'ajax',
		url : './JXY/js/MenuLoader.js'
	}
})