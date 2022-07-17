import Page from '../view/page/page';
import { Limits } from '../helpers/enums';
import { IFilter } from '../helpers/interfaces';


class Range {
  name: string;
  min: string;
  max: string;
  page: Page;
  input1: HTMLInputElement;
  input2: HTMLInputElement;
  value1: HTMLSpanElement;
  value2: HTMLSpanElement;
  track: HTMLDivElement;

  constructor(name: string, min: string, max: string, page: Page) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.page = page;
    [this.input1, 
     this.input2, 
     this.value1, 
     this.value2, 
     this.track] = 
      this.page.drawRangeInput(this.name, Number(this.min), Number(this.max));
  }

  public onInput1(): void {
    if (parseInt(this.input2.value) - parseInt(this.input1.value) <= Limits.minInputFilterGap) {
      this.input1.value = String(parseInt(this.input2.value) - Limits.minInputFilterGap);
    }
    this.value1.textContent = this.input1.value;
    this.fillColor(this.input1, this.input2, this.track);
  }

  public onInput2(): void {
    if (parseInt(this.input2.value) - parseInt(this.input1.value) <= Limits.minInputFilterGap) {
      this.input2.value = String(parseInt(this.input1.value) + Limits.minInputFilterGap);
    }
    this.value2.textContent = this.input2.value;
    this.fillColor(this.input1, this.input2, this.track);
  }

  public onMouseup1(filters: IFilter, key: string): void {
    filters[key as keyof IFilter] = [this.input1.value, this.input2.value];
  }

  public onMouseup2(filters: IFilter, key: string): void {
    filters[key as keyof IFilter] = [this.input1.value, this.input2.value];
  }

  public clickOnTrack(event: MouseEvent, filters: IFilter, key: string): void {
    const eventPosition: number = Math.round(event.offsetX / this.track.offsetWidth * (parseInt(this.input1.max) - parseInt(this.input1.min)) + parseInt(this.input1.min));
    if (Math.abs(eventPosition - parseInt(this.input1.value)) < Math.abs(eventPosition - parseInt(this.input2.value))) {
      this.input1.value = String(eventPosition);
      this.value1.textContent = String(eventPosition);
    } else {
      this.input2.value = String(eventPosition);
      this.value2.textContent = String(eventPosition);
    }
    this.fillColor(this.input1, this.input2, this.track);
    filters[key as keyof IFilter] = [this.input1.value, this.input2.value];
  }

  public reset(filters: IFilter, key: string): void {
    if (!filters[key as keyof IFilter].length) {
      filters[key as keyof IFilter] = [this.min, this.max];
      this.input1.value = this.min;
      this.value1.textContent = this.min;
      this.input2.value = this.max;
      this.value2.textContent = this.max;
    } else {
      this.input1.value = filters[key as keyof IFilter][0];
      this.value1.textContent = filters[key as keyof IFilter][0];
      this.input2.value = filters[key as keyof IFilter][1];
      this.value2.textContent = filters[key as keyof IFilter][1];
    }
    
    this.fillColor(this.input1, this.input2, this.track);
  }

  private fillColor(slider1: HTMLInputElement, slider2: HTMLInputElement, track: HTMLDivElement): void {
    const percent1: number = (parseInt(slider1.value) / parseInt(slider1.max)) * 100;
    const percent2: number = (parseInt(slider2.value) / parseInt(slider1.max)) * 100;
    track.style.background = `linear-gradient(to right, #dadae5 ${percent1 - 2}% , #5fd65f ${percent1 - 2}% , #5fd65f ${percent2 - 2}%, #dadae5 ${percent2 - 2}%)`;
  }

}

export default Range;