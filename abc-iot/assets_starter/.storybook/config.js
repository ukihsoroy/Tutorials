import {
    configure,
    addParameters
} from '@storybook/vue';
import theme from './theme';

addParameters({
    viewport: {
        defaultViewport: 'responsive'
    },
    options: {
        theme: theme,
    }
});
const req = require.context(`${process.env.CURR_DIR}/packages/`, true, /\.stories\.js$/);
const reqdemos = require.context(`${process.env.CURR_DIR}/demos/`, true, /\.stories\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
	reqdemos.keys().forEach(filename => reqdemos(filename));
	
}
configure(loadStories, module);