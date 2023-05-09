import { ApiService } from './../services/api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { NgZone } from "@angular/core";
import { Geolocation } from "@awesome-cordova-plugins/geolocation/ngx";
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { ExtraService } from '../services/extra.service';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
declare var google: any;
@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class SetupProfilePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild("search")
  public searchElementRef!: ElementRef;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocompleteItems: any;

  listishiddenFrom = true;
  latitude: any;
  longitude: any;

  location: any;
  placeid: any;
  from: any = "";
  locationishidden: boolean = false;
  currentaddress: any;
  firstname: any = '';
  lastname: any = '';
  number: any = ''
  address: any = '';
  profilepic: any;
  constructor(public router: Router,
    private nativeGeocoder: NativeGeocoder,
    private ngZone: NgZone,
    private androidPermissions: AndroidPermissions,
    public extra: ExtraService,
    private locationAccuracy: LocationAccuracy,
    public api: ApiService
  ) { }

  ngOnInit() {
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
        this.address = place.formatted_address
        console.log(this.latitude + ' ' + '' + this.longitude);

        localStorage.setItem("longitude", this.longitude);
        localStorage.setItem("lattitude", this.latitude);


      });
    });
  }

  // getCurrentLocatiuon() {
  //   // this.locationAccuracy.canRequest().then((canRequest: boolean) => {

  //   //   if (canRequest) {
  //   //     // the accuracy option will be ignored by iOS
  //   //     this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
  //   //       () => {
  //   //         console.log('Request successful');
  //   //         console.log("getCurrentLocatiuon()");
  //   //         // this.extra.loadershow()
  //   //         navigator.geolocation.getCurrentPosition((position) => {
  //   //           this.latitude = position.coords.latitude;
  //   //           this.longitude = position.coords.longitude;
  //   //           // this.extra.hideLoader()
  //   //           this.getAddress(this.latitude, this.longitude);
  //   //         });
  //   //       },
  //   //       error => console.log('Error requesting location permissions', error)
  //   //     );
  //   //   }

  //   // });

  //   navigator.geolocation.getCurrentPosition((position) => {
  //     this.latitude = position.coords.latitude;
  //     this.longitude = position.coords.longitude;
  //     // this.extra.hideLoader()
  //     this.getAddress(this.latitude, this.longitude);
  //   });
  // }
  getCurrentLocatiuon() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.requestToSwitchOnGPS();
        } else {
          this.askGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
  askGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              this.requestToSwitchOnGPS();
            },
            error => {
              alert(error)
            }
          );
      }
    });
  }
  requestToSwitchOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);

          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          // this.extra.hideLoader()
          this.getAddress(this.latitude, this.longitude);
        });
      },
      error => alert(JSON.stringify(error))
    );
  }
  getAddress(latitude: any, longitude: any) {
    console.log("lat======", latitude);
    console.log("long======", longitude);
    this.modal.dismiss();
    this.nativeGeocoder.reverseGeocode(latitude, longitude)
      .then((result: NativeGeocoderResult[]) => {
        console.log(result[0])
        this.address = result[0].thoroughfare + ' ' + result[0].subLocality + ' ' + result[0].subAdministrativeArea + ' ' + result[0].countryName

      })
      .catch((error: any) => console.log(error));
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }



  onWillDismiss(event: Event) {

  }

  saveProfile() {
    let data = {
      "users_customers_id": localStorage.getItem('loggedId'),
      "first_name": this.firstname,
      "last_name": this.lastname,
      "phone": this.number,
      "location": this.address,
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
      this.extra.presentToast('Phone number name required')
    }
    else if (this.address == '') {
      this.extra.presentToast('location  required')
    } else {
      this.extra.loadershow()
      this.api.sendRequest('update_profile_signup', data).subscribe((res: any) => {
        console.log('prfofile response====', res);
        if (res.status == 'success') {
          this.extra.hideLoader()
          localStorage.setItem('profileupdate', JSON.stringify(res.data[0]))
          this.router.navigate(['/social-links']);
        }

        else {
          this.extra.hideLoader()
          this.extra.presentToast(res.message)
        }
      })
    }


  }
}
