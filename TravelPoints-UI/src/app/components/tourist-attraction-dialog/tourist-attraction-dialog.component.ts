import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TouristAttractionService} from "../../services/tourist-attraction.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TouristAttraction} from "../../models/TouristAttraction";
import {NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

const FORM_NAME: string = "name"
const FORM_LOCATION: string = "location"
const FORM_CATEGORY: string = "category"
const FORM_CREATED_AT: string = "createdAt"
const FORM_DESCRIPTION: string = "description"
const FORM_ENTRY_PRICE: string = "entryPrice"
const FORM_OFFERS: string = "offers"
const FORM_IMAGE_PATH: string = "imageUrl"
@Component({
  selector: 'app-destination-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    HttpClientModule
  ],
  providers:[TouristAttractionService],
  templateUrl: './tourist-attraction-dialog.component.html',
  styleUrl: './tourist-attraction-dialog.component.css'
})

export class TouristAttractionDialogComponent implements OnInit{
  myForm: any
  id: string = ""
  location: string = ""
  name: string = ""
  description: string = ""
  category: string = ""
  createdAt: string = ""
  offers: string = ""
  entryPrice: number = 0
  title: string = ""
  imageUrl: string = "";

  constructor(private fb: FormBuilder, private touristAttractionService: TouristAttractionService, public dialogRef: MatDialogRef<TouristAttractionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name:[''],
      location: [''],
      category: [''],
      createdAt: [''],
      description: [''],
      entryPrice: [''],
      offers: [''],
      imageUrl:['']
    });
    if(this.data.id == -99) {
      this.title = "New Tourist Attraction"
    } else {
      this.title = "Update: " + this.data.location
      this.myForm.patchValue(this.data)
    }
  }

  onSubmit(){
    let touristAttraction = new TouristAttraction()
    touristAttraction.name = this.myForm.get(FORM_NAME).value;
    touristAttraction.location = this.myForm.get(FORM_LOCATION).value;
    touristAttraction.category = this.myForm.get(FORM_CATEGORY).value;
    touristAttraction.createdAt = this.myForm.get(FORM_CREATED_AT).value;
    touristAttraction.descriptionText = this.myForm.get(FORM_DESCRIPTION).value;
    touristAttraction.entryPrice = this.myForm.get(FORM_ENTRY_PRICE).value;
    touristAttraction.offers = this.myForm.get(FORM_OFFERS).value;
    touristAttraction.imagePath = this.myForm.get(FORM_IMAGE_PATH).value;
    if(this.data.id != -99) {
      this.id = this.data.id
      touristAttraction.attractionId = this.data.id
      this.touristAttractionService.updateTouristAttraction(touristAttraction).subscribe((updatedDestination: TouristAttraction) => {
        console.log(updatedDestination)
      })
    } else {
      this.touristAttractionService.addTouristAttraction(touristAttraction).subscribe((createdDestination: TouristAttraction) => {
        console.log(createdDestination)
      })

    }

    this.dialogRef.close()
  }


}
