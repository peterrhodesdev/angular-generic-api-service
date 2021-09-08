import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title: string;
  @Input() bodyLines: string[];

  constructor(public activeModal: NgbActiveModal) {
    this.title = '';
    this.bodyLines = [];
  }

  public static open(modal: NgbModal, title: string, bodyLines: string[]): void {
    const modalRef = modal.open(ModalComponent)
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.bodyLines = bodyLines;
  }
}
