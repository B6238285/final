import { BookInterface } from "./IBook";
import { MemberClassesInterface } from "./IMemberClass";
import { UsersInterface } from "./IUser";

export interface BillInterface {
    ID?: number;

    BookID?: number; //
    Book?: BookInterface; //

    EmployeeID?: number;//
    Employee?: UsersInterface; //

    UserID?: number;//
    User?: UsersInterface; //

    Discount?: number;//

    Total?: number; //

    BillTime?: Date | null;  //

    MemberClassID?: number;
    MemberClass?: MemberClassesInterface; 
    
    Price?: number; 
    

}