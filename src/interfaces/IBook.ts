import { BookTypesInterface } from "./IBookType";
import { RolesInterface } from "./IRole";
import { ShelfsInterface } from "./IShelf";
import { UsersInterface } from "./IUser";
export interface BookInterface{
    ID?: number;
    Name?: string;
    UserID?: number;
    User?: UsersInterface;
    BooktypeID?: number ;
    Booktype?:BookTypesInterface;
    RoleID?: number ;
    Role?: RolesInterface;
    RoleID_?: number ;
    Role_?: RolesInterface;
    ShelfID?: number;
    Shelf?: ShelfsInterface;
    Author?: string | null;
    Page?: number | null;
    Quantity?: number | null;
    Price?: number ;
    Date?: Date | null;
}