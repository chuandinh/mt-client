import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YamlViewerComponent } from './yaml-viewer.component';

describe('YamlViewerComponent', () => {
  let component: YamlViewerComponent;
  let fixture: ComponentFixture<YamlViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YamlViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YamlViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
