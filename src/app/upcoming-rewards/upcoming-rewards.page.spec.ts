import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpcomingRewardsPage } from './upcoming-rewards.page';

describe('UpcomingRewardsPage', () => {
  let component: UpcomingRewardsPage;
  let fixture: ComponentFixture<UpcomingRewardsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpcomingRewardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
