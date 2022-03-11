import { ExceptionUtils } from '@utils';

export default class PermissionUtils {
	static verifyManagerPermission(reqData) {
		if (!reqData.is_manager) {
			throw new ExceptionUtils('Apenas gestores podem realizar este tipo de ação!');
		}
	}

	static verifyRootPermission(reqData) {
		if (!reqData.is_company_director) {
			throw new ExceptionUtils('Apenas diretores podem realizar este tipo de ação!');
		}
	}
}
