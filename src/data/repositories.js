const Cache = require('@11ty/eleventy-cache-assets')
const { filter } = require('lodash')
const orderBy = require('lodash/orderBy')

// if you want to display your most starred github repositories,
// change this to your username. if not, set it to false.
const YOUR_GITHUB_USERNAME = 'farossco'

var useExludeList = false
var excludeList = [ 'android_device_xiaomi_cepheus', 'MineSwagg', 'MIUI-V6-Icon-Pack', 'buildF32']
var includeList = [ 'Lumos', 'ArduinoLogger', 'PGHM-localisation-BTWF', 'BM70-BLEDK3']

module.exports = async function () {
    if (!YOUR_GITHUB_USERNAME) {
        return []
    }

    try {
        console.log('Fetching GitHub repos...')
        const repos = await Cache(
            `https://api.github.com/users/${YOUR_GITHUB_USERNAME}/repos`,
            {
                duration: '1d',
                type: 'json'
            }
        )
		if (useExludeList)
		{
			return filter(orderBy(orderBy(repos, 'stargazers_count', 'desc'), 'forks_count', 'desc'), function(item) {return excludeList.indexOf(item.name) === -1})
		}
		else
		{
			return filter(orderBy(orderBy(repos, 'stargazers_count', 'desc'), 'forks_count', 'desc'), function(item) {return includeList.indexOf(item.name) != -1})
		}
    } catch (e) {
        console.log('Failed fetching GitHub repos')
        return []
    }
}
