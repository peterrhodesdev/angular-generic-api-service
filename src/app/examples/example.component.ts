import { Component } from '@angular/core';
import { ExampleService } from 'src/app/examples/example.service';
import { ExampleModel } from 'src/app/examples/example.model';
import { AtLeastIdAndOneField } from 'src/app/models/base-api-endpoint.model';

@Component({
  selector: 'app-example',
  template: ``,
  styles: ['']
})
export class ExampleComponent {

  public example?: ExampleModel = undefined;
  public examples: ExampleModel[] = [];

  constructor(private exampleService: ExampleService) {}

  public performRequests(): void {
    // Create
    this.createExample(new ExampleModel());
    // Delete
    this.deleteExample(1);
    // Get
    this.getManyExamples();
    this.getOneExample(1);
    // Update
    let modifiedExample: ExampleModel = new ExampleModel();
    modifiedExample.id = 1;
    this.updateFullExample(modifiedExample);
    let partialExample: AtLeastIdAndOneField<ExampleModel> = { id: 1, strProp: '', };
    this.updatePartialExample(partialExample);
  }

  /* create */

  private createExample(newExample: ExampleModel): void {
    try {
      this.exampleService.create(newExample)
        .subscribe(
          data => { this.examples.push(data); },
          error => { console.log(`Error creating example: ${error}`); }
        )
        .add(() => { console.log(`Finished request`); });
    } catch(error) {
      console.log(`Error trying to create example: ${error}`);
    }
  }

  /* delete */

  private deleteExample(id: number): void {
    this.exampleService.delete(id)
      .subscribe(
        data => { this.examples = this.examples.filter(example => example.id !== id); },
        error => { console.log(`Error deleting example with id = ${id}: ${error}`); }
      )
      .add(() => { console.log(`Finished request`); });
  }

  /* get */

  private getManyExamples(): void {
    this.exampleService.getMany()
      .subscribe(
        data => { this.examples = [...data]; },
        error => { console.log(`Error getting examples: ${error}`); }
      )
      .add(() => { console.log(`Finished request`); });
  }

  private getOneExample(id: number): void {
    this.exampleService.getOne(id)
      .subscribe(
        data => { this.example = data; },
        error => { console.log(`Error getting example with id = ${id}: ${error}`); }
      )
      .add(() => { console.log(`Finished request`); });
  }

  /* update */

  private updateFullExample(modifiedExample: ExampleModel): void {
    try {
      this.exampleService.updateFull(modifiedExample)
        .subscribe(
          data => { this.exampleUpdated(data); },
          error => { console.log(`Error updating example: ${error}`); }
        )
        .add(() => { console.log(`Finished request`); });
    } catch(error) {
      console.log(`Error trying to update example: ${error}`);
    }
  }

  private updatePartialExample(partialExample: AtLeastIdAndOneField<ExampleModel>): void {
    try {
      this.exampleService.updatePartial(partialExample)
        .subscribe(
          data => { this.exampleUpdated(data); },
          error => { console.log(`Error updating example: ${error}`); }
        )
        .add(() => { console.log(`Finished request`); });
    } catch(error) {
      console.log(`Error trying to update example: ${error}`);
    }
  }

  private exampleUpdated(updatedExample: ExampleModel): void {
    this.examples.forEach(example => {
      if (example.id === updatedExample.id) {
        example = updatedExample;
      }
    });
  }
}
