"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
var testing_1 = require("@angular/common/http/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var home_component_1 = require("./home.component");
describe('The home component', function () {
    var component;
    var fixture;
    var httpMock;
    beforeEach(function () {
        testing_2.TestBed.configureTestingModule({
            declarations: [home_component_1.HomeComponent],
            providers: [
                { provide: 'BASE_URL', useValue: "baseUrl/" }
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            imports: [testing_1.HttpClientTestingModule]
        }).compileComponents();
        httpMock = testing_2.TestBed.inject(testing_1.HttpTestingController);
        fixture = testing_2.TestBed.createComponent(home_component_1.HomeComponent);
        component = fixture.componentInstance;
    });
    describe("when getting software", function () {
        describe("when version has three numbers", function () {
            it("gets software versions", function () {
                component.version = "1.2.3";
                component.getSoftwareVersions();
                var request = httpMock.expectOne('baseUrl/software/1.2.3');
                request.flush([{ name: "VS", version: "1.2.3" }]);
                expect(request.request.method).toBe("GET");
                expect(component.softwares).toEqual([{ name: "VS", version: "1.2.3" }]);
                expect(component.message).toEqual("");
            });
        });
        describe("when version has two numbers", function () {
            it("gets software versions", function () {
                component.version = "1.2";
                component.getSoftwareVersions();
                var request = httpMock.expectOne('baseUrl/software/1.2');
                request.flush([{ name: "VS", version: "1.2.3" }]);
                expect(request.request.method).toBe("GET");
                expect(component.softwares).toEqual([{ name: "VS", version: "1.2.3" }]);
                expect(component.message).toEqual("");
            });
        });
        describe("when version has one number", function () {
            it("gets software versions", function () {
                component.version = "1";
                component.getSoftwareVersions();
                var request = httpMock.expectOne('baseUrl/software/1');
                request.flush([{ name: "VS", version: "1.2.3" }]);
                expect(request.request.method).toBe("GET");
                expect(component.softwares).toEqual([{ name: "VS", version: "1.2.3" }]);
                expect(component.message).toEqual("");
            });
        });
        describe("when version is invalid", function () {
            describe("when version a letter", function () {
                it("displays error message", function () {
                    component.version = "a";
                    component.getSoftwareVersions();
                    expect(component.message).toBe("Invalid Version Number");
                });
            });
            describe("when version has four numbers", function () {
                it("displays error message", function () {
                    component.version = "1.2.3.4";
                    component.getSoftwareVersions();
                    expect(component.message).toBe("Invalid Version Number");
                });
            });
        });
    });
});
//# sourceMappingURL=home.component.spec.js.map