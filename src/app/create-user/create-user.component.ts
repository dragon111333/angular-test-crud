import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import axios from 'axios';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

    provinces :  Array<any> | undefined = [] ;
    amphures : Array<any> |undefined = [];
    tambons : Array<any> |undefined = [];

    async ngAfterViewInit() : Promise<void> {
        console.log("init");
        await this.getProvince();
    }

    async getProvince() : Promise<void>{
      try{

        this.provinces = (await axios.get(`${location.origin}/assets/thai_provinces.json`)).data;
      }catch(error : any){
        console.error(error);
      }
    }

    async getAmphures(provindeId : Number) : Promise<void>{
      this.amphures = (await axios.get(`${location.origin}/assets/thai_amphures.json`))
                      .data
                      .filter((e:any)=>e.province_id == provindeId);
    }
    async getTambons(amphureId :Number) : Promise<void>{
      this.tambons = (await axios.get(`${location.origin}/assets/thai_tambons.json`))
                      .data
                      .filter((e:any)=>e.amphure_id == amphureId);
    }

    async onProvinceChange(e:any) : Promise<void>{
        let pro : HTMLSelectElement = document.querySelector("#province") as HTMLSelectElement ;
        await this.getAmphures(parseInt(pro.value));
    }

    async onAmphuresChange(e:any){
      let amph : HTMLSelectElement = document.querySelector("#district") as HTMLSelectElement ;
      await this.getTambons(parseInt(amph.value));
    }


    async onTambonsChange(e:any){
      let sub : HTMLSelectElement = document.querySelector("#subDistrict") as HTMLSelectElement ;
      (document.querySelector("#postalCode") as HTMLSelectElement).value = sub.value;
    }

    onConverChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
          const file = input.files[0];
          console.log('Selected file:', file);
          let target : HTMLImageElement = document.querySelector("#cover-img-pre") as HTMLImageElement;
          if(target) target.src = URL.createObjectURL(file);
      }
    }
    onProfileChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
          const file = input.files[0];
          console.log('Selected file:', file);
          let target : HTMLImageElement = document.querySelector("#profile-img-pre") as HTMLImageElement;
          if(target) target.src = URL.createObjectURL(file);
      }
    }
}
