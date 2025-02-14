import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamLogo',
  standalone: true
})
export class TeamLogoPipe implements PipeTransform {

  async transform(logo: string | undefined): Promise<string> {
    const returnURL1 = `../assets/placeholders/teamPH${Math.floor(Math.random() * (3 - 1 + 1) + 1)}.jpeg`;
    let returnURL = returnURL1;
    if (logo == undefined) return returnURL;
    returnURL = await this.checkError(logo, returnURL1);

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
