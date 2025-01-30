import { Pipe, PipeTransform } from '@angular/core';
import { UserM } from './models/userModels';

@Pipe({
    name: 'userImage',
    standalone: true
})
export class UserImagePipe implements PipeTransform {

    async transform($user: UserM): Promise<string> {
        const returnURL1 = `../assets/placeholders/geminiAvatar${Math.floor(Math.random() * (4 - 1 + 1) + 1)}.png`;
        let returnURL = returnURL1;
        if ($user == undefined) return returnURL;

        if ($user.useGooglePhoto) {
            returnURL = await this.checkError($user.userPhotoUrl, returnURL1);
        } else {
            returnURL = await this.checkError($user.profilePicture, returnURL1);
        }

        return returnURL;

    }
    checkError(value: string | undefined, returnURL: string): Promise<string> {
        let toRet = new Promise<string>((resolve) => {

            if (value != null && value != "" && value != 'undefined') {
                var img = new Image()
                img.onerror = function () {
                    resolve(returnURL);
                };
                img.onload = function () {
                    resolve(value);
                };
                img.src = value;
            }
            else {
                resolve(returnURL)
            }
        })
        return toRet;
    }
}
