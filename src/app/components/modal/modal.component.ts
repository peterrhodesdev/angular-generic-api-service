import { Component, Input } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title: string = '';
  @Input() body: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  public static open(modal: NgbModal, title: string, body: string): void {
    const modalRef = modal.open(ModalComponent)
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.body = body;

    modalRef.result.then((res) => {
      //console.log(`Closed with: ${res}`);
    }, (res) => {
      //console.log(`Dismissed ${ModalComponent.getDismissReason(res)}`);
    });
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
