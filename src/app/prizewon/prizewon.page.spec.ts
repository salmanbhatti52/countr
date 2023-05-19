import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrizewonPage } from './prizewon.page';

describe('PrizewonPage', () => {
  let component: PrizewonPage;
  let fixture: ComponentFixture<PrizewonPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PrizewonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
