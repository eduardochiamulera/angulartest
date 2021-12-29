import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { UniqueIdService } from "../../services/unique-id/unique-id.service";
import { LikeWidgetModule } from "./like-widget.module";
import { LikeWidgetComponent } from "./like-widget.component";

describe(LikeWidgetComponent.name, () => {
    let fixture: ComponentFixture<LikeWidgetComponent> = null;
    let component : LikeWidgetComponent = null;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            // declarations: [LikeWidgetComponent],
            // providers: [UniqueIdService],
            // imports:[FontAwesomeModule]
            imports:[LikeWidgetModule]
        }).compileComponents();

        fixture = TestBed.createComponent(LikeWidgetComponent);
        component = fixture.componentInstance;
    }); 

    it('Should create componenet', () => {
        expect(component).toBeTruthy();
    })

    it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
        fixture.detectChanges();
        expect(component.id).toBeTruthy();
    });

    it('Should NOT auto-generate Id during ngOnInit when (@Input id) is assigned', () => {
        const someId = 'someId';
        component.id = someId;
        fixture.detectChanges();
        expect(component.id).toBe(someId);
    });

    // it(`#${LikeWidgetComponent.prototype.like.name} should trigger emission when called`, done => {
    //     //testando teste assincrono
    //     //da um nome ao método (done) e o chama ao final para finalizar o metodo
    //     fixture.detectChanges();
    //     component.liked.subscribe(() =>{
    //         expect(true).toBeTrue();
    //         done();
    //     });
    //     component.like();
    // });

    it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called`, () => {
        spyOn(component.liked, 'emit');
        fixture.detectChanges();
        component.like();
        expect(component.liked.emit).toHaveBeenCalled();
    });
})