module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
					@use 'sass:math';
					@import '@/assets/scss/_variables.scss';
					@import '@/assets/scss/_mixins.scss';
				`,
			},
		},
	},
}
