import { ExceptionUtils } from '@utils';

export default class PermissionUtils {
	static verifyManagerPermission(reqData) {
		if (!reqData.is_manager) {
			throw new ExceptionUtils('NOT_AUTHORIZED');
		}
	}

	static verifyRootPermission(reqData) {
		if (!reqData.is_company_director) {
			throw new ExceptionUtils('NOT_AUTHORIZED');
		}
	}
}
