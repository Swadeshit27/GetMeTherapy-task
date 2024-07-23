declare interface userType {
    username?: string;
    email: string;
    password: string;
    terms?: boolean;
}
declare type StackParamList = {
    Register: undefined;
    Login: undefined;
    OuterScreen: undefined;
    LoginSuccessful: undefined;
};
declare type screenNavigation = StackNavigationProp<StackParamList>;

declare interface quoteType {
    quote: string,
    author: string,
    category?: string
}