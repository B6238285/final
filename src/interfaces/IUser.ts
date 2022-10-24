import { ProvincesInterface } from "./IProvince";
import { RolesInterface } from "./IRole";
import { MemberClassesInterface } from "./IMemberClass";
export interface UsersInterface {
    ID?:        number,
    Pin?:       string,
	FirstName?: string,
	LastName?:  string,
	Civ?:       string,
	Phone?:     string,
	Email?:     string,
	Password?:  string, 
	Address?:   string,
	ProvinceID?:    number,
	Province?:    ProvincesInterface,  
	RoleID?:        number,    
	Role?:        RolesInterface,       
	MemberClassID?: number, 
	MemberClass?: MemberClassesInterface,    
}