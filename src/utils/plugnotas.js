import axios from 'axios';
import { get } from 'lodash';

import { config } from '../config/config';
import { ExceptionUtils } from '@utils';

export default class PlugNotasUtils {
	static async makeRequest(options) {
		try {
			const response = await axios({
				baseURL: config.plugnotas.api_url,
				headers: {
					'x-api-key': config.plugnotas.api_token
				},
				...options
			});

			return get(response, 'data');
		} catch (error) {
			const message = get(error, 'response.data.error') || 'PLUGNOTAS_REQUEST_ERROR';

			throw new ExceptionUtils(message);
		}
	}

	static createNFSe(options) {
		return this.makeRequest({
			url: '/nfse',
			method: 'POST',
			...options,
			data
		});
	}
}
