export enum ERROR_FLAG {
  // validate failed
  ERROR_FLAG_VALIDATE_ACCOUNT_FAILED = "ERROR_FLAG_VALIDATE_ACCOUNT_FAILED",
  ERROR_FLAG_VALIDATE_REQUEST_BODY_FAILED = "ERROR_FLAG_VALIDATE_REQUEST_BODY_FAILED",
  ERROR_FLAG_VALIDATE_REQUEST_TOKEN_FAILED = "ERROR_FLAG_VALIDATE_REQUEST_TOKEN_FAILED",
  ERROR_FLAG_VALIDATE_REQUEST_PARAM_FAILED = "ERROR_FLAG_VALIDATE_REQUEST_PARAM_FAILED",
  ERROR_FLAG_VALIDATE_VERIFICATION_CODE_FAILED = "ERROR_FLAG_VALIDATE_VERIFICATION_CODE_FAILED",
  ERROR_FLAG_PARSE_REQUEST_BODY_FAILED = "ERROR_FLAG_PARSE_REQUEST_BODY_FAILED",
  ERROR_FLAG_PARSE_REQUEST_URI_FAILED = "ERROR_FLAG_PARSE_REQUEST_URI_FAILED",
  ERROR_FLAG_PARSE_INVITE_LINK_HASH_FAILED = "ERROR_FLAG_PARSE_INVITE_LINK_HASH_FAILED",
  ERROR_FLAG_CAN_NOT_TRANSFER_OWNER_TO_PENDING_USER = "ERROR_FLAG_CAN_NOT_TRANSFER_OWNER_TO_PENDING_USER",
  ERROR_FLAG_CAN_NOT_REMOVE_OWNER_FROM_TEAM = "ERROR_FLAG_CAN_NOT_REMOVE_OWNER_FROM_TEAM",
  ERROR_FLAG_SIGN_UP_EMAIL_MISMATCH = "ERROR_FLAG_SIGN_UP_EMAIL_MISMATCH",
  ERROR_FLAG_OWNER_ROLE_MUST_BE_TRANSFERED = "ERROR_FLAG_OWNER_ROLE_MUST_BE_TRANSFERED",
  ERROR_FLAG_PASSWORD_INVALIED = "ERROR_FLAG_PASSWORD_INVALIED",
  ERROR_FLAG_TEAM_MUST_TRANSFERED_BEFORE_USER_SUSPEND = "ERROR_FLAG_TEAM_MUST_TRANSFERED_BEFORE_USER_SUSPEND",
  ERROR_FLAG_INVITE_EMAIL_MISMATCH = "ERROR_FLAG_INVITE_EMAIL_MISMATCH",

  // can not create
  ERROR_FLAG_CAN_NOT_CREATE_USER = "ERROR_FLAG_CAN_NOT_CREATE_USER",
  ERROR_FLAG_CAN_NOT_CREATE_TEAM = "ERROR_FLAG_CAN_NOT_CREATE_TEAM",
  ERROR_FLAG_CAN_NOT_CREATE_TEAM_MEMBER = "ERROR_FLAG_CAN_NOT_CREATE_TEAM_MEMBER",
  ERROR_FLAG_CAN_NOT_CREATE_INVITE = "ERROR_FLAG_CAN_NOT_CREATE_INVITE",
  ERROR_FLAG_CAN_NOT_CREATE_PROMOTE_CODE = "ERROR_FLAG_CAN_NOT_CREATE_PROMOTE_CODE",
  ERROR_FLAG_CAN_NOT_CREATE_DOMAIN = "ERROR_FLAG_CAN_NOT_CREATE_DOMAIN",
  ERROR_FLAG_CAN_NOT_CREATE_ACTION = "ERROR_FLAG_CAN_NOT_CREATE_ACTION",
  ERROR_FLAG_CAN_NOT_CREATE_RESOURCE = "ERROR_FLAG_CAN_NOT_CREATE_RESOURCE",
  ERROR_FLAG_CAN_NOT_CREATE_APP = "ERROR_FLAG_CAN_NOT_CREATE_APP",
  ERROR_FLAG_OVER_MAX_FREE_TEAM_LIMIT = "ERROR_FLAG_OVER_MAX_FREE_TEAM_LIMIT",

  // can not get resource
  ERROR_FLAG_CAN_NOT_GET_USER = "ERROR_FLAG_CAN_NOT_GET_USER",
  ERROR_FLAG_CAN_NOT_GET_TEAM = "ERROR_FLAG_CAN_NOT_GET_TEAM",
  ERROR_FLAG_CAN_NOT_GET_TEAM_MEMBER = "ERROR_FLAG_CAN_NOT_GET_TEAM_MEMBER",
  ERROR_FLAG_CAN_NOT_GET_INVITE = "ERROR_FLAG_CAN_NOT_GET_INVITE",
  ERROR_FLAG_CAN_NOT_GET_PROMOTE_CODE = "ERROR_FLAG_CAN_NOT_GET_PROMOTE_CODE",
  ERROR_FLAG_CAN_NOT_GET_DOMAIN = "ERROR_FLAG_CAN_NOT_GET_DOMAIN",
  ERROR_FLAG_CAN_NOT_GET_ACTION = "ERROR_FLAG_CAN_NOT_GET_ACTION",
  ERROR_FLAG_CAN_NOT_GET_RESOURCE = "ERROR_FLAG_CAN_NOT_GET_RESOURCE",
  ERROR_FLAG_CAN_NOT_GET_RESOURCE_META_INFO = "ERROR_FLAG_CAN_NOT_GET_RESOURCE_META_INFO",
  ERROR_FLAG_CAN_NOT_GET_APP = "ERROR_FLAG_CAN_NOT_GET_APP",
  ERROR_FLAG_CAN_NOT_GET_BUILDER_DESCRIPTION = "ERROR_FLAG_CAN_NOT_GET_BUILDER_DESCRIPTION",

  // can not update resource
  ERROR_FLAG_CAN_NOT_UPDATE_USER = "ERROR_FLAG_CAN_NOT_UPDATE_USER",
  ERROR_FLAG_CAN_NOT_UPDATE_TEAM = "ERROR_FLAG_CAN_NOT_UPDATE_TEAM",
  ERROR_FLAG_CAN_NOT_UPDATE_TEAM_MEMBER = "ERROR_FLAG_CAN_NOT_UPDATE_TEAM_MEMBER",
  ERROR_FLAG_CAN_NOT_UPDATE_INVITE = "ERROR_FLAG_CAN_NOT_UPDATE_INVITE",
  ERROR_FLAG_CAN_NOT_UPDATE_PROMOTE_CODE = "ERROR_FLAG_CAN_NOT_UPDATE_PROMOTE_CODE",
  ERROR_FLAG_CAN_NOT_UPDATE_DOMAIN = "ERROR_FLAG_CAN_NOT_UPDATE_DOMAIN",
  ERROR_FLAG_CAN_NOT_UPDATE_ACTION = "ERROR_FLAG_CAN_NOT_UPDATE_ACTION",
  ERROR_FLAG_CAN_NOT_UPDATE_RESOURCE = "ERROR_FLAG_CAN_NOT_UPDATE_RESOURCE",
  ERROR_FLAG_CAN_NOT_UPDATE_APP = "ERROR_FLAG_CAN_NOT_UPDATE_APP",

  // can not delete
  ERROR_FLAG_CAN_NOT_DELETE_USER = "ERROR_FLAG_CAN_NOT_DELETE_USER",
  ERROR_FLAG_CAN_NOT_DELETE_TEAM = "ERROR_FLAG_CAN_NOT_DELETE_TEAM",
  ERROR_FLAG_CAN_NOT_DELETE_TEAM_MEMBER = "ERROR_FLAG_CAN_NOT_DELETE_TEAM_MEMBER",
  ERROR_FLAG_CAN_NOT_DELETE_INVITE = "ERROR_FLAG_CAN_NOT_DELETE_INVITE",
  ERROR_FLAG_CAN_NOT_DELETE_PROMOTE_CODE = "ERROR_FLAG_CAN_NOT_DELETE_PROMOTE_CODE",
  ERROR_FLAG_CAN_NOT_DELETE_DOMAIN = "ERROR_FLAG_CAN_NOT_DELETE_DOMAIN",
  ERROR_FLAG_CAN_NOT_DELETE_ACTION = "ERROR_FLAG_CAN_NOT_DELETE_ACTION",
  ERROR_FLAG_CAN_NOT_DELETE_RESOURCE = "ERROR_FLAG_CAN_NOT_DELETE_RESOURCE",
  ERROR_FLAG_CAN_NOT_DELETE_APP = "ERROR_FLAG_CAN_NOT_DELETE_APP",
  ERROR_FLAG_CAN_NOT_DELETE_TEAM_DUE_TO_LICENSE_REMAINS = "ERROR_FLAG_CAN_NOT_DELETE_TEAM_DUE_TO_LICENSE_REMAINS",

  // can not other operation
  ERROR_FLAG_CAN_NOT_CHECK_TEAM_MEMBER = "ERROR_FLAG_CAN_NOT_CHECK_TEAM_MEMBER",
  ERROR_FLAG_CAN_NOT_DUPLICATE_APP = "ERROR_FLAG_CAN_NOT_DUPLICATE_APP",
  ERROR_FLAG_CAN_NOT_RELEASE_APP = "ERROR_FLAG_CAN_NOT_RELEASE_APP",
  ERROR_FLAG_CAN_NOT_TEST_RESOURCE_CONNECTION = "ERROR_FLAG_CAN_NOT_TEST_RESOURCE_CONNECTION",

  // permissing failed
  ERROR_FLAG_ACCESS_DENIED = "ERROR_FLAG_ACCESS_DENIED",
  ERROR_FLAG_TEAM_CLOSED_THE_PERMISSION = "ERROR_FLAG_TEAM_CLOSED_THE_PERMISSION",
  ERROR_FLAG_EMAIL_ALREADY_USED = "ERROR_FLAG_EMAIL_ALREADY_USED",
  ERROR_FLAG_EMAIL_HAS_BEEN_TAKEN = "ERROR_FLAG_EMAIL_HAS_BEEN_TAKEN",
  ERROR_FLAG_PROMOTE_CODE_ALREADY_USED = "ERROR_FLAG_PROMOTE_CODE_ALREADY_USED",
  ERROR_FLAG_INVITATION_LINK_UNAVALIABLE = "ERROR_FLAG_INVITATION_LINK_UNAVALIABLE",
  ERROR_FLAG_TEAM_IDENTIFIER_HAS_BEEN_TAKEN = "ERROR_FLAG_TEAM_IDENTIFIER_HAS_BEEN_TAKEN",
  ERROR_FLAG_USER_ALREADY_JOINED_TEAM = "ERROR_FLAG_USER_ALREADY_JOINED_TEAM",
  ERROR_FLAG_SIGN_IN_FAILED = "ERROR_FLAG_SIGN_IN_FAILED",
  ERROR_FLAG_NO_SUCH_USER = "ERROR_FLAG_NO_SUCH_USER",
  ERROR_FLAG_REGISTER_BLOCKED = "ERROR_FLAG_REGISTER_BLOCKED",

  // call resource failed
  ERROR_FLAG_SEND_EMAIL_FAILED = "ERROR_FLAG_SEND_EMAIL_FAILED",
  ERROR_FLAG_SEND_VERIFICATION_CODE_FAILED = "ERROR_FLAG_SEND_VERIFICATION_CODE_FAILED",
  ERROR_FLAG_CREATE_LINK_FAILED = "ERROR_FLAG_CREATE_LINK_FAILED",
  ERROR_FLAG_CREATE_UPLOAD_URL_FAILED = "ERROR_FLAG_CREATE_UPLOAD_URL_FAILED",
  ERROR_FLAG_EXECUTE_ACTION_FAILED = "ERROR_FLAG_EXECUTE_ACTION_FAILED",
  ERROR_FLAG_GENERATE_SQL_FAILED = "ERROR_FLAG_GENERATE_SQL_FAILED",

  // internal failed
  ERROR_FLAG_BUILD_TEAM_MEMBER_LIST_FAILED = "ERROR_FLAG_BUILD_TEAM_MEMBER_LIST_FAILED",
  ERROR_FLAG_BUILD_TEAM_CONFIG_FAILED = "ERROR_FLAG_BUILD_TEAM_CONFIG_FAILED",
  ERROR_FLAG_BUILD_TEAM_PERMISSION_FAILED = "ERROR_FLAG_BUILD_TEAM_PERMISSION_FAILED",
  ERROR_FLAG_BUILD_USER_INFO_FAILED = "ERROR_FLAG_BUILD_USER_INFO_FAILED",
  ERROR_FLAG_BUILD_APP_CONFIG_FAILED = "ERROR_FLAG_BUILD_APP_CONFIG_FAILED",
  ERROR_FLAG_GENERATE_PASSWORD_FAILED = "ERROR_FLAG_GENERATE_PASSWORD_FAILED",

  // new
  ERROR_FLAG_INVALIED_OAUTH_AGENCY = "ERROR_FLAG_INVALIED_OAUTH_AGENCY",
  ERROR_FLAG_EXCHANGE_OAUTH_TOKEN_FAILED = "ERROR_FLAG_EXCHANGE_OAUTH_TOKEN_FAILED",
  ERROR_FLAG_OAUTH_FETCH_USER_INFO_FAILED = "ERROR_FLAG_OAUTH_FETCH_USER_INFO_FAILED",
  ERROR_FLAG_USER_PASSWORD_NOT_SETTED = "ERROR_FLAG_USER_PASSWORD_NOT_SETTED",
  ERROR_FLAG_OAUTH_CONNECT_FAILED = "ERROR_FLAG_OAUTH_CONNECT_FAILED",
  ERROR_FLAG_CAN_NOT_START_TRANSACTION = "ERROR_FLAG_CAN_NOT_START_TRANSACTION",
  ERROR_FLAG_CAN_NOT_GET_TRANSACTION = "ERROR_FLAG_CAN_NOT_GET_TRANSACTION",
  ERROR_FLAG_CAN_NOT_COMMIT_TRANSACTION = "ERROR_FLAG_CAN_NOT_COMMIT_TRANSACTION",
  ERROR_FLAG_CAN_NOT_CANCEL_TRANSACTION = "ERROR_FLAG_CAN_NOT_CANCEL_TRANSACTION",
  ERROR_FLAG_CAN_NOT_GET_CAPACITY = "ERROR_FLAG_CAN_NOT_GET_CAPACITY",
  ERROR_FLAG_INVALIED_TRANSACTION_SERIAL_MODIFY_TARGET = "ERROR_FLAG_INVALIED_TRANSACTION_SERIAL_MODIFY_TARGET",
  ERROR_FLAG_INVALIED_TRANSACTION_SERIAL_MODIFY_METHOD = "ERROR_FLAG_INVALIED_TRANSACTION_SERIAL_MODIFY_METHOD",
  ERROR_FLAG_CAN_NOT_RETRIEVE_TRANSACTION = "ERROR_FLAG_CAN_NOT_RETRIEVE_TRANSACTION",
  ERROR_FLAG_CAN_NOT_WRITE_QUEUE = "ERROR_FLAG_CAN_NOT_WRITE_QUEUE",
  ERROR_FLAG_CAN_NOT_GET_CUSTOMER = "ERROR_FLAG_CAN_NOT_GET_CUSTOMER",
  ERROR_FLAG_NO_PAYMENT_INFO = "ERROR_FLAG_NO_PAYMENT_INFO",
  ERROR_FLAG_CAN_NOT_GET_PORTAL_PAGE_URL = "ERROR_FLAG_CAN_NOT_GET_PORTAL_PAGE_URL",
  ERROR_FLAG_CAN_NOT_CREATE_CUSTOMER = "ERROR_FLAG_CAN_NOT_CREATE_CUSTOMER",
  ERROR_FLAG_CAN_NOT_SUBSCRIBE_THIS_PLAN = "ERROR_FLAG_CAN_NOT_SUBSCRIBE_THIS_PLAN",
  ERROR_FLAG_CAN_NOT_GET_SUBSCRIPTION = "ERROR_FLAG_CAN_NOT_GET_SUBSCRIPTION",
  ERROR_FLAG_SUBSCRIPTION_ALREADY_EXISTS = "ERROR_FLAG_SUBSCRIPTION_ALREADY_EXISTS",
  ERROR_FLAG_SUBSCRIPTION_PLAN_ILLEGAL = "ERROR_FLAG_SUBSCRIPTION_PLAN_ILLEGAL",
  ERROR_FLAG_CAN_NOT_GENERATE_CHECKOUT_SESSION_URL = "ERROR_FLAG_CAN_NOT_GENERATE_CHECKOUT_SESSION_URL",
  ERROR_FLAG_CAN_NOT_PURCHASE_THIS_ITEM = "ERROR_FLAG_CAN_NOT_PURCHASE_THIS_ITEM",
  ERROR_FLAG_PURCHASE_ITEM_ILLEGAL = "ERROR_FLAG_PURCHASE_ITEM_ILLEGAL",
  ERROR_FLAG_MODIFY_SUBSCRIPTION_FAILED = "ERROR_FLAG_MODIFY_SUBSCRIPTION_FAILED",
  ERROR_FLAG_CANCEL_SUBSCRIPTION_FAILED = "ERROR_FLAG_CANCEL_SUBSCRIPTION_FAILED",
  ERROR_FLAG_CAN_NOT_GET_REQUEST_BODY = "ERROR_FLAG_CAN_NOT_GET_REQUEST_BODY",
  ERROR_FLAG_WEBHOOK_SIGNATURE_VERIFICATION_FAILED = "ERROR_FLAG_WEBHOOK_SIGNATURE_VERIFICATION_FAILED",
  ERROR_FLAG_ILLEGAL_WEBHOOK_EVENT = "ERROR_FLAG_ILLEGAL_WEBHOOK_EVENT",
  ERROR_FLAG_INIT_REST_API_FAILED = "ERROR_FLAG_INIT_REST_API_FAILED",
  ERROR_FLAG_CANCEL_TRANSACTION_FAILED = "ERROR_FLAG_CANCEL_TRANSACTION_FAILED",
  ERROR_FLAG_CAN_NOT_CREATE_SUBSCRIPTION = "ERROR_FLAG_CAN_NOT_CREATE_SUBSCRIPTION",
  ERROR_FLAG_COMMIT_TRANSACTION_FAILED = "ERROR_FLAG_COMMIT_TRANSACTION_FAILED",
  ERROR_FLAG_ILLEGAL_SUBSCRIPTION = "ERROR_FLAG_ILLEGAL_SUBSCRIPTION",
  ERROR_FLAG_ILLEGAL_PRICE_ID = "ERROR_FLAG_ILLEGAL_PRICE_ID",
  ERROR_FLAG_CAN_NOT_GET_CAPACITY_RECORD = "ERROR_FLAG_CAN_NOT_GET_CAPACITY_RECORD",
  ERROR_FLAG_CAN_NOT_INIT_REST_API = "ERROR_FLAG_CAN_NOT_INIT_REST_API",
  ERROR_FLAG_UPDATE_CAPACITY_FAILED = "ERROR_FLAG_UPDATE_CAPACITY_FAILED",
  ERROR_FLAG_CAN_NOT_CALCULATE_MODIFIED_VALUE = "ERROR_FLAG_CAN_NOT_CALCULATE_MODIFIED_VALUE",
  ERROR_FLAG_CAN_NOT_GET_SESSION = "ERROR_FLAG_CAN_NOT_GET_SESSION",
  ERROR_FLAG_CAN_NOT_RESET_CAPACITY = "ERROR_FLAG_CAN_NOT_RESET_CAPACITY",
  ERROR_FLAG_CAN_NOT_UPDATE_SUBSCRIPTION = "ERROR_FLAG_CAN_NOT_UPDATE_SUBSCRIPTION",
  ERROR_FLAG_BUILD_TEAM_MEMBER_CONFIG_FAILED = "ERROR_FLAG_BUILD_TEAM_MEMBER_CONFIG_FAILED",
  ERROR_FLAG_CAN_NOT_GET_UPCOMING_INVOICE = "ERROR_FLAG_CAN_NOT_GET_UPCOMING_INVOICE",
  ERROR_FLAG_CAN_NOT_INCREASE_TEAM_MEMBER_DUE_TO_NO_BALANCE = "ERROR_FLAG_CAN_NOT_INCREASE_TEAM_MEMBER_DUE_TO_NO_BALANCE",
  ERROR_FLAG_INVALIED_AUTHORIZATOIN_TOKEN = "ERROR_FLAG_INVALIED_AUTHORIZATOIN_TOKEN",
  ERROR_FLAG_CAN_NOT_GENERATE_AUTHORIZATION_TOKEN = "ERROR_FLAG_CAN_NOT_GENERATE_AUTHORIZATION_TOKEN",
  ERROR_FLAG_ILLEGAL_WEBHOOK_TOKEN = "ERROR_FLAG_ILLEGAL_WEBHOOK_TOKEN",
  ERROR_FLAG_INVALIED_REQUEST = "ERROR_FLAG_INVALIED_REQUEST",
  ERROR_FLAG_TARGET_USER_ALREADY_APPLIED_APPSUMO = "ERROR_FLAG_TARGET_USER_ALREADY_APPLIED_APPSUMO",
  ERROR_FLAG_CAN_NOT_ENHANCE_TIER = "ERROR_FLAG_CAN_NOT_ENHANCE_TIER",
  ERROR_FLAG_INVALIED_ACTION = "ERROR_FLAG_INVALIED_ACTION",
  ERROR_FLAG_DO_NOT_HAVE_APPSUMO_PLAN = "ERROR_FLAG_DO_NOT_HAVE_APPSUMO_PLAN",
  ERROR_FLAG_APPSUMO_PLAN_ALREADY_APPLIED = "ERROR_FLAG_APPSUMO_PLAN_ALREADY_APPLIED",
  ERROR_FLAG_CAN_NOT_DELETE_SUBSCRIPTION = "ERROR_FLAG_CAN_NOT_DELETE_SUBSCRIPTION",
  ERROR_FLAG_APPSUMO_PLAN_ILLEGAL = "ERROR_FLAG_APPSUMO_PLAN_ILLEGAL",
  ERROR_FLAG_CAN_NOT_REMOVE_TEAM_MEMBER_BECAUSE_APPSUMO_BUYER = "ERROR_FLAG_CAN_NOT_REMOVE_TEAM_MEMBER_BECAUSE_APPSUMO_BUYER",
  ERROR_FLAG_CAN_NOT_UPDATE_TEAM_MEMBER_ROLE_BECAUSE_APPSUMO_BUYER = "ERROR_FLAG_CAN_NOT_UPDATE_TEAM_MEMBER_ROLE_BECAUSE_APPSUMO_BUYER",
  ERROR_FLAG_INSUFFICIENT_TEAM_LICENSE = "ERROR_FLAG_INSUFFICIENT_TEAM_LICENSE",

  ERROR_FLAG_INVALID_TINYURL = "ERROR_FLAG_INVALID_TINYURL",
  ERROR_FLAG_PARSE_QUERY_PARAM_FAILED = "ERROR_FLAG_PARSE_QUERY_PARAM_FAILED",

  // can not create
  ERROR_FLAG_CAN_NOT_CREATE_TEAM_DRIVE_GCS = "ERROR_FLAG_CAN_NOT_CREATE_TEAM_DRIVE_GCS",
  ERROR_FLAG_CAN_NOT_CREATE_TEAM_DRIVE_DB = "ERROR_FLAG_CAN_NOT_CREATE_TEAM_DRIVE_DB",
  ERROR_FLAG_CAN_NOT_CREATE_FILE = "ERROR_FLAG_CAN_NOT_CREATE_FILE",
  ERROR_FLAG_CAN_NOT_CREATE_UPLOAD_URL = "ERROR_FLAG_CAN_NOT_CREATE_UPLOAD_URL",
  ERROR_FLAG_CAN_NOT_CREATE_DOWNLOAD_URL = "ERROR_FLAG_CAN_NOT_CREATE_DOWNLOAD_URL",
  ERROR_FLAG_CAN_NOT_CREATE_TINYURL = "ERROR_FLAG_CAN_NOT_CREATE_TINYURL",

  // can not change
  ERROR_FLAG_CAN_NOT_EDIT_FILE = "ERROR_FLAG_CAN_NOT_EDIT_FILE",

  // can not get resource
  ERROR_FLAG_CAN_NOT_GET_TEAM_DRIVE = "ERROR_FLAG_CAN_NOT_GET_TEAM_DRIVE",
  ERROR_FLAG_CAN_NOT_GET_TEAM_DRIVE_GCS = "ERROR_FLAG_CAN_NOT_GET_TEAM_DRIVE_GCS",
  ERROR_FLAG_CAN_NOT_GET_DRIVE_METADATA = "ERROR_FLAG_CAN_NOT_GET_DRIVE_METADATA",
  ERROR_FLAG_CAN_NOT_GET_FILES = "ERROR_FLAG_CAN_NOT_GET_FILES",
  ERROR_FLAG_CAN_NOT_DOWNLOAD = "ERROR_FLAG_CAN_NOT_DOWNLOAD",
  ERROR_FLAG_CAN_NOT_GET_FILE = "ERROR_FLAG_CAN_NOT_GET_FILE",
  ERROR_FLAG_CAN_NOT_GET_DRIVE_CAPACITY = "ERROR_FLAG_CAN_NOT_GET_DRIVE_CAPACITY",

  // can not delete resource
  ERROR_FLAG_CAN_NOT_DELETE_FILE = "ERROR_FLAG_CAN_NOT_DELETE_FILE",
  ERROR_FLAG_CAN_NOT_DELETE_TEAM_DRIVE_GCS = "ERROR_FLAG_CAN_NOT_DELETE_TEAM_DRIVE_GCS",
  ERROR_FLAG_CAN_NOT_DELETE_TEAM_DRIVE_DB = "ERROR_FLAG_CAN_NOT_DELETE_TEAM_DRIVE_DB",

  // special
  ERROR_FLAG_DUPLICATED_FILE_NAME = "ERROR_FLAG_DUPLICATED_FILE_NAME",
  ERROR_FLAG_COVER_FILE = "ERROR_FLAG_COVER_FILE",
  ERROR_FLAG_ENSURE_PARENT_DIRECTORY_EXISTS_FAILED = "ERROR_FLAG_ENSURE_PARENT_DIRECTORY_EXISTS_FAILED",
  ERROR_FLAG_FILE_NOT_EDITABLE = "ERROR_FLAG_FILE_NOT_EDITABLE",
  ERROR_FLAG_MOVE_ILLEGAL = "ERROR_FLAG_MOVE_ILLEGAL",
  ERROR_FLAG_OUT_OF_USAGE_VOLUME = "ERROR_FLAG_OUT_OF_USAGE_VOLUME",
  ERROR_FLAG_OUT_OF_USAGE_TRAFFIC = "ERROR_FLAG_OUT_OF_USAGE_TRAFFIC",

  // pay error
  ERROR_FLAG_INSUFFICIENT_CREDIT = "ERROR_FLAG_INSUFFICIENT_CREDIT",
  ERROR_FLAG_INSUFFICIENT_DRIVE_VOLUME = "ERROR_FLAG_INSUFFICIENT_DRIVE_VOLUME",
  ERROR_FLAG_INSUFFICIENT_DRIVE_TRAFFIC = "ERROR_FLAG_INSUFFICIENT_DRIVE_TRAFFIC",
  ERROR_FLAG_INSUFFICIENT_AI_TOKEN_GENERAL = "ERROR_FLAG_INSUFFICIENT_AI_TOKEN_GENERAL",
  ERROR_FLAG_AUTO_CHARGE_CREDIT_FAILED = "ERROR_FLAG_AUTO_CHARGE_CREDIT_FAILED",
  ERROR_FLAG_CREDIT_PAYMENT_FAILURE = "ERROR_FLAG_CREDIT_PAYMENT_FAILURE",
  ERROR_FLAG_AI_AGENT_MAX_TOKEN_OVER_CREDIT_BALANCE = "ERROR_FLAG_AI_AGENT_MAX_TOKEN_OVER_CREDIT_BALANCE",
}
