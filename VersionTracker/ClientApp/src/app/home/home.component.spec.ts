import 'jasmine';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";

describe('The home component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: 'BASE_URL', useValue: "baseUrl/" }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });


  describe("when getting software", () => {
    describe("when version has three numbers", () => {
      it("gets software versions", () => {
        component.version = "1.2.3"
        component.getSoftwareVersions();
        var request = httpMock.expectOne('baseUrl/software/1.2.3');
        request.flush([{ name: "VS", version: "1.2.3" }]);

        expect(request.request.method).toBe("GET");
        expect(component.softwares).toEqual([{ name: "VS", version: "1.2.3" }]);
        expect(component.message).toEqual("");
      });
    });

    describe("when version has two numbers", () => {
      it("gets software versions", () => {
        component.version = "1.2"
        component.getSoftwareVersions();
        var request = httpMock.expectOne('baseUrl/software/1.2');
        request.flush([{ name: "VS", version: "1.2.3" }]);

        expect(request.request.method).toBe("GET");
        expect(component.softwares).toEqual([{ name: "VS", version: "1.2.3" }]);
        expect(component.message).toEqual("");
      });
    });

    describe("when version has one number", () => {
      it("gets software versions", () => {
        component.version = "1"
        component.getSoftwareVersions();
        var request = httpMock.expectOne('baseUrl/software/1');
        request.flush([{ name: "VS", version: "1.2.3" }]);

        expect(request.request.method).toBe("GET");
        expect(component.softwares).toEqual([{ name: "VS", version: "1.2.3" }]);
        expect(component.message).toEqual("");
      });
    });

    describe("when version is invalid", () => {
      describe("when version a letter", () => {
        it("displays error message", () => {
          component.version = "a"
          component.getSoftwareVersions();
          expect(component.message).toBe("Invalid Version Number");
        });
      });

      describe("when version has four numbers", () => {
        it("displays error message", () => {
          component.version = "1.2.3.4"
          component.getSoftwareVersions();
          expect(component.message).toBe("Invalid Version Number");
        });
      });
    });
  });
});
