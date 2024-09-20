import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEsLint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	pluginJs.configs.recommended,
	...tsEsLint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		languageOptions: { globals: globals.browser },
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			quotes: 'off',
			indent: 'off',
		},
	},
]
