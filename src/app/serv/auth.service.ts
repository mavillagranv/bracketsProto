import { EventEmitter, Injectable } from "@angular/core";
import { UserM } from "../models/userModels";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    $user = new EventEmitter<UserM>()
    $admin!: boolean;
    $developer!: boolean;
    last$user: UserM = {
        //For admins
        eventOrganizer: true,
        betaTester: true,
        teamAdmin: true,
        developer: true,
        timestamp: new Date(),
        firstUpdate: true,
        userIsAdmin: true,
        isTeamAdministrator: true,
        //Personal information not changable
        userDisplayName: 'Samuel',
        userId: 'Sam12345',
        userPhotoUrl: 'https://cataas.com/cat',
        userMail: 'S@s.com',
        //Profile information
        useGooglePhoto: true,
        profilePicture: 'https://cataas.com/cat',
        coverPicture: 'https://cataas.com/cat',
        //Personal information 
        playerIsActive: true,
        userIsParent: true,
        userIsCoach: true,
        userFirstName: 'Samuel',
        userLastName: 'Suárez',
        //userMiddleName: string,
        userUsername: 'SSSSSS',
        playerCity: 'Xico',
        //Socials
        userInstagram: '@sss',
        userX: '@sss',
        userYoutube: '@ssss',
        //Player properties
        playerDOB: new Date(),
        playerClassOf: 2024,
        playerHeight: "5'7",
        playerPosition: 'Center',
        playerSchool: 'UV',
        //Coach properties
        coachSchool: 'UV',
        //Event organizer properties
        userPaymentLinks: [{
            link: 'https://gateway.jcc.com.cy/developer/en/images/mportal3/mp3/mp3-127-single-click-c7373e4d.png',
            alias: 'General entry',
            amount: 250
        }]
    };
    reloadActiveUser(calledFrom: string) {
        this.$user.emit(this.last$user);
    }
}