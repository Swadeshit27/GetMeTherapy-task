declare interface userType {
    username?: string;
    email: string;
    password: string; 
}
declare type StackParamList = {
    Register: undefined;
    Login: undefined;
    OuterScreen: undefined;
    LoginSuccessful: undefined;
}; 

declare interface quoteType {
    quote: string,
    author: string,
    category?: string
}