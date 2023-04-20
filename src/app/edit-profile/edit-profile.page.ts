import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { NgZone } from "@angular/core";
import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { ExtraService } from '../services/extra.service';
import { ApiService } from '../services/api.service';

declare var google: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditProfilePage implements OnInit {
  showPassword = false;
  @ViewChild("search")
  public searchElementRef!: ElementRef;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocompleteItems: any;

  listishiddenFrom = true;
  latitude: any;
  longitude: any;

  placeid: any;
  from: any = "";
  locationishidden: boolean = false;
  currentaddress: any;
  getPwdType = 'password';
  users: any;
  userdetail: any;
  firstname: any;
  lastname: any;
  email: any;
  number: any;
  location: any;
  password: any;
  profilepic: any;
  constructor(
    public router: Router,
    public user: UserService,
    private nativeGeocoder: NativeGeocoder,
    private ngZone: NgZone,
    public extra: ExtraService,
    private locationAccuracy: LocationAccuracy,
    public api: ApiService) { }

  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this.extra.loadershow()
    this.api.sendRequest('users_customers_profile_by_id', { "users_customers_id": localStorage.getItem('loggedId') }).subscribe((res: any) => {
      console.log('rssss----', res);
      if (res.status == 'success') {
        this.extra.hideLoader();
        this.userdetail = res.data
        this.firstname = this.userdetail.first_name
        this.lastname = this.userdetail.last_name
        this.email = this.userdetail.email
        this.number = this.userdetail.phone
        this.location = this.userdetail.location
        this.password = this.userdetail.password
        this.latitude = this.userdetail.lattitude
        this.longitude = this.userdetail.longitude
      } else {
        this.extra.hideLoader()
        this.extra.presentToast(res.message)
      }
    })
  }
  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    let autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
    );

    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        console.log({ place }, place.geometry.location?.lat());

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location?.lat();
        this.longitude = place.geometry.location?.lng();
        this.location = place.formatted_address
        console.log(this.latitude + ' ' + '' + this.longitude);

        localStorage.setItem("longitude", this.longitude);
        localStorage.setItem("lattitude", this.latitude);


      });
    });
  }

  getCurrentLocatiuon() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            console.log('Request successful');
            console.log("getCurrentLocatiuon()");
            // this.extra.loadershow()
            navigator.geolocation.getCurrentPosition((position) => {
              console.log(position);

              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              // this.extra.hideLoader()
              this.getAddress(this.latitude, this.longitude);
            });
          },
          error => console.log('Error requesting location permissions', error)
        );
      }

    });

  }

  getAddress(latitude: any, longitude: any) {
    console.log("lat======", latitude);
    console.log("long======", longitude);
    this.nativeGeocoder.reverseGeocode(latitude, longitude)
      .then((result: NativeGeocoderResult[]) => {
        console.log('addressss', result[0]);
        this.location = result[0].thoroughfare + ' ' + result[0].subLocality + ' ' + result[0].subAdministrativeArea + ' ' + result[0].countryName
        // this.location = this.pretifyAddress(result[0]);
      })
      .catch((error: any) => console.log(error));
  }

  updateProfile() {
    let data = {
      "users_customers_id": localStorage.getItem('loggedId'),
      "first_name": this.firstname,
      "last_name": this.lastname,
      "phone": this.number,
      "location": this.location,
      "longitude": this.longitude,
      "lattitude": this.latitude,
      "notifications": "Yes",
      "profile_pic": this.profilepic
    }
    if (this.firstname == '') {
      this.extra.presentToast('First name required')
    }
    else if (this.lastname == '') {
      this.extra.presentToast('last name required')
    }
    else if (this.number == '') {
      this.extra.presentToast('Phone number is required')
    }
    else if (this.location == '') {
      this.extra.presentToast('location is required')
    } else {
      this.extra.loadershow()
      this.api.sendRequest('update_profile_signup', data).subscribe((res: any) => {
        console.log('prfofile response====', res);
        if (res.status == 'success') {
          this.extra.hideLoader()
          localStorage.setItem('profileupdate', JSON.stringify(res.data[0]))
          this.router.navigate(['/profile']);
        }

        else {
          this.extra.hideLoader()
          this.extra.presentToast(res.message)
        }
      })
    }

  }

  toggleGetType(field: string) {
    if (field == 'pwd') {
      if (this.getPwdType == 'password') {
        this.getPwdType = 'text';
        this.showPassword = true;
      } else {
        this.getPwdType = 'password';
        this.showPassword = false;
      }
    }

  }


  pretifyAddress(address: any) {
    let obj = [];
    let data = "";
    for (let key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        data += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

}
