import Page from '../view/page/page';
import { Limits } from '../helpers/enums';
import { IFilter } from '../helpers/interfaces';


class Range {
  name: string;
  min: string;
  max: string;
  page: Page;
  leftInput: HTMLInputElement;
  rightInput: HTMLInputElement;
  fromValue: HTMLSpanElement;
  toValue: HTMLSpanElement;
  track: HTMLDivElement;

  constructor(name: string, min: string, max: string, page: Page) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.page = page;
    [this.leftInput, 
     this.rightInput, 
     this.fromValue, 
     this.toValue, 
     this.track] = 
      this.page.drawRangeInput(this.name, Number(this.min), Number(this.max));
  }

  public onLeftInput(): void {
    const gapBetweenInputValues = parseInt(this.rightInput.value) - parseInt(this.leftInput.value);
    if (gapBetweenInputValues <= Limits.minInputFilterGap) {
      this.leftInput.value = String(parseInt(this.rightInput.value) - Limits.minInputFilterGap);
    }
    this.fromValue.textContent = this.leftInput.value;
    this.fillColor(this.leftInput, this.rightInput, this.track);
  }

  public onRightInput(): void {
    const gapBetweenInputValues = parseInt(this.rightInput.value) - parseInt(this.leftInput.value);
    if (gapBetweenInputValues <= Limits.minInputFilterGap) {
      this.rightInput.value = String(parseInt(this.leftInput.value) + Limits.minInputFilterGap);
    }
    this.toValue.textContent = this.rightInput.value;
    this.fillColor(this.leftInput, this.rightInput, this.track);
  }

  public onMouseup1(filters: IFilter, key: string): void {
    filters[key as keyof IFilter] = [this.leftInput.value, this.rightInput.value];
  }

  public onMouseup2(filters: IFilter, key: string): void {
    filters[key as keyof IFilter] = [this.leftInput.value, this.rightInput.value];
  }

  public clickOnTrack(event: MouseEvent, filters: IFilter, key: string): void {
    const eventPosition: number = event.offsetX / this.track.offsetWidth;
    const adjustedPosition: number = Math.round(eventPosition * (parseInt(this.leftInput.max) - parseInt(this.leftInput.min)) + parseInt(this.leftInput.min));
    const distanceBetweenClickAndLeftInput = Math.abs(adjustedPosition - parseInt(this.leftInput.value));
    const distanceBetweenClickAndRightInput = Math.abs(adjustedPosition - parseInt(this.rightInput.value));
    if (distanceBetweenClickAndLeftInput < distanceBetweenClickAndRightInput) {
      this.leftInput.value = String(adjustedPosition);
      this.fromValue.textContent = String(adjustedPosition);
    } else {
      this.rightInput.value = String(adjustedPosition);
      this.toValue.textContent = String(adjustedPosition);
    }
    this.fillColor(this.leftInput, this.rightInput, this.track);
    filters[key as keyof IFilter] = [this.leftInput.value, this.rightInput.value];
  }

  public reset(filters: IFilter, key: string): void {
    if (!filters[key as keyof IFilter].length) {
      filters[key as keyof IFilter] = [this.min, this.max];
    }
    this.leftInput.value = filters[key as keyof IFilter][0];
    this.fromValue.textContent = filters[key as keyof IFilter][0];
    this.rightInput.value = filters[key as keyof IFilter][1];
    this.toValue.textContent = filters[key as keyof IFilter][1];
    
    this.fillColor(this.leftInput, this.rightInput, this.track);
  }

  private fillColor(leftInput: HTMLInputElement, rightInput: HTMLInputElement, track: HTMLDivElement): void {
    const leftInputPosition: number = Math.round(parseInt(leftInput.value) / parseInt(leftInput.max) * 100 - parseInt(leftInput.min));
    const rightInputPosition: number = Math.round(parseInt(rightInput.value) / parseInt(leftInput.max) * 100 - parseInt(leftInput.min));
    track.style.background = `linear-gradient(to right, #dadae5 ${leftInputPosition}% , #5fd65f ${leftInputPosition}% , #5fd65f ${rightInputPosition}%, #dadae5 ${rightInputPosition}%)`;
  }

}

export default Range;