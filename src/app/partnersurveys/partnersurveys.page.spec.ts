import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnersurveysPage } from './partnersurveys.page';

describe('PartnersurveysPage', () => {
  let component: PartnersurveysPage;
  let fixture: ComponentFixture<PartnersurveysPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PartnersurveysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
