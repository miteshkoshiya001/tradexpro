//captcha
export const CAPTCHA_TYPE_DISABLE = 0;
export const CAPTCHA_TYPE_RECAPTCHA = 1;
export const CAPTCHA_TYPE_GEETESTCAPTCHA = 2;

//payment
export const PAYPAL = 3;
export const BANK_DEPOSIT = 4;
export const STRIPE = 5;
export const WALLET_DEPOSIT = 6;
export const CRYPTO = 7;
export const CRYPTO_DEPOSIT = 8;
export const PAYSTACK = 9;
export const PAYDUNYA = 13;
export const PERFECT_MONEY = 12;
export const MOBILE_MONEY = 14;

// FAQ Type List
export const FAQ_TYPE_MAIN = 1;
export const FAQ_TYPE_DEPOSIT = 2;
export const FAQ_TYPE_WITHDRAWN = 3;
export const FAQ_TYPE_BUY = 4;
export const FAQ_TYPE_SELL = 5;
export const FAQ_TYPE_COIN = 6;
export const FAQ_TYPE_WALLET = 7;
export const FAQ_TYPE_TRADE = 8;

//kyc list
export const KYC_PHONE_VERIFICATION = 1;
export const KYC_EMAIL_VERIFICATION = 2;
export const KYC_NID_VERIFICATION = 3;
export const KYC_PASSPORT_VERIFICATION = 4;
export const KYC_DRIVING_VERIFICATION = 5;
export const KYC_VOTERS_CARD_VERIFICATION = 6;

export const EXCHANGE_LAYOUT_ONE = 1;
export const EXCHANGE_LAYOUT_TWO = 2;
export const EXCHANGE_LAYOUT_THREE = 3;

export const MY_WALLET_DEPOSIT_TYPE = "deposit";
export const MY_WALLET_WITHDRAW_TYPE = "withdraw";

//Foter Menu
export const CUSTOM_PAGE_LINK_PAGE = 1;
export const CUSTOM_PAGE_LINK_URL = 2;

// Wallet Type
export const WITHDRAW_FESS_FIXED = 1;
export const WITHDRAW_FESS_PERCENT = 2;

//ICO Form input type
export const FORM_INPUT_TEXT = 1;
export const FORM_SELECT = 2;
export const FORM_RADIO = 3;
export const FORM_CHECKBOX = 4;
export const FORM_TEXT_AREA = 5;
export const FORM_FILE = 6;

export const STATUS_MODIFICATION = 3;
export const STATUS_PENDING = 0;
export const STATUS_ACCEPTED = 1;
export const STATUS_REJECTED = 2;

//ico
export const PHASE_SORT_BY_EXPIRED = 1;
export const PHASE_SORT_BY_FEATURED = 2;
export const PHASE_SORT_BY_RECENT = 3;
export const PHASE_SORT_BY_FUTURE = 4;

//blog
export const TYPE_BLOG_RECENT = 1;
export const TYPE_BLOG_POPULER = 2;
export const TYPE_BLOG_FEATURED = 3;

//news
export const TYPE_NEWS_RECENT = 1;
export const TYPE_NEWS_POPULER = 2;

//Ticket
export const TICKET_STATUS_PENDING = 1;
export const TICKET_STATUS_OPEN = 2;
export const TICKET_STATUS_CLOSE = 3;
export const TICKET_STATUS_CLOSE_FOREAVER = 4;

//kyc type
export const KYC_TYPE_DISABLE = 0;
export const KYC_TYPE_MANUAL = 1;
export const KYC_TYPE_PERSONA = 2;

//referral type
export const REFERRAL_TYPE_DEPOSIT = 1;
export const REFERRAL_TYPE_TRADE = 2;

//price type p2p
export const FIXED_PRICE = 1;
export const FLOAT_PRICE = 2;

//Create payment p2p
export const PAYMENT_METHOD_BANK = 1;
export const PAYMENT_METHOD_MOBILE = 2;
export const PAYMENT_METHOD_CARD = 3;

//P2p card type
export const PAYMENT_METHOD_CARD_TYPE_DEBIT = 1;
export const PAYMENT_METHOD_CARD_TYPE_CREDIT = 2;

//p2p 1 = Buy / 2 = Sell
export const BUY = 1;
export const SELL = 2;

//submit
export const AMOUNT_PRICE = 1;
export const AMOUNT = 2;

// Trade Status
export const TRADE_STATUS_CANCELED_TIME_EXPIRED = 0;
export const TRADE_STATUS_ESCROW = 1;
export const TRADE_STATUS_PAYMENT_DONE = 2;
export const TRADE_STATUS_TRANSFER_DONE = 3;
export const TRADE_STATUS_CANCELED = 4;
export const TRADE_STATUS_REFUNDED_BY_ADMIN = 6;
export const TRADE_STATUS_RELEASED_BY_ADMIN = 7;
export const SEND = 1;
export const RECEIVE = 2;
export const POSITIVE = 1;
export const NEGATIVE = 0;

//staking terms type
export const STAKING_TERMS_TYPE_STRICT = 1;
export const STAKING_TERMS_TYPE_FLEXIBLE = 2;

//staking investment status
export const STAKING_INVESTMENT_STATUS_RUNNING = 1;
export const STAKING_INVESTMENT_STATUS_CANCELED = 2;
export const STAKING_INVESTMENT_STATUS_UNPAID = 3;
export const STAKING_INVESTMENT_STATUS_PAID = 4;
export const STAKING_INVESTMENT_STATUS_SUCCESS = 5;

export const CROSS = 2;
export const ISOLATED = 1;

export const AMOUNT_TYPE_BASE = 1;
export const AMOUNT_TYPE_TRADE = 2;
export const MARGIN_MODE_ISOLATED = 1;
export const MARGIN_MODE_CROSS = 1;

export const BASE = 1;
export const TRADE = 2;

//future order history
export const POSITON = 1;
export const OPEN_ORDER = 2;
export const ORDER_HISTORY = 3;
export const TRADE_HISTORY = 4;
export const TRANSACTION_HISTORY = 5;

//trade type
export const FUTURE_TRADE_TYPE_OPEN = 1;
export const FUTURE_TRADE_TYPE_CLOSE = 2;
export const FUTURE_TRADE_TYPE_TAKE_PROFIT_CLOSE = 3;
export const FUTURE_TRADE_TYPE_STOP_LOSS_CLOSE = 4;

//trade side type buy sell
export const TRADE_TYPE_BUY = 1;
export const TRADE_TYPE_SELL = 2;

export const FUTURE_TRADE_TRANSACTION_TYPE_TRANSFER = 1;
export const FUTURE_TRADE_TRANSACTION_TYPE_COMMISSION = 2;
export const FUTURE_TRADE_TRANSACTION_TYPE_FUNDING_FEES = 3;
export const FUTURE_TRADE_TRANSACTION_TYPE_REALIZED_PNL = 4;

export const LIMIT_ORDER = 1;
export const MARKET_ORDER = 2;
export const STOP_LIMIT_ORDER = 3;
export const STOP_MARKET_ORDER = 4;
