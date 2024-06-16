import { Component } from '@angular/core';
import { FormGroup, UntypedFormControl } from '@angular/forms';
import { setFormConfig } from '@app/shared/utils/forms';
import { IFormElements } from '@app/commons/form-elements/form-elements.models';
import { toCamelCase } from '@app/shared/utils/string-utils';
import { arrayMove } from '@app/shared/utils/arrays';
import { HomeService } from './home.service';

interface IDefaultConfig {
  name?: string;
  formconfig: IFormElements[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends HomeService {
  form: FormGroup = new FormGroup({});

  defaultConfig: IDefaultConfig[] = this.defaultConfigStart.map(el => ({
    ...el,
    formconfig: this.setElementFormConfig(el.name, el.formconfig),
  }));

  colors = [
    `AliceBlue`,
    `AntiqueWhite`,
    `Aqua`,
    `Aquamarine`,
    `Azure`,
    `Beige`,
    `Bisque`,
    `Black`,
    `BlanchedAlmond`,
    `Blue`,
    `BlueViolet`,
    `Brown`,
    `BurlyWood`,
    `CadetBlue`,
    `Chartreuse`,
    `Chocolate`,
    `Coral`,
    `CornflowerBlue`,
    `Cornsilk`,
    `Crimson`,
    `Cyan`,
    `DarkBlue`,
    `DarkCyan`,
    `DarkGoldenRod`,
    `DarkGray`,
    `DarkGrey`,
    `DarkGreen`,
    `DarkKhaki`,
    `DarkMagenta`,
    `DarkOliveGreen`,
    `Darkorange`,
    `DarkOrchid`,
    `DarkRed`,
    `DarkSalmon`,
    `DarkSeaGreen`,
    `DarkSlateBlue`,
    `DarkSlateGray`,
    `DarkSlateGrey`,
    `DarkTurquoise`,
    `DarkViolet`,
    `DeepPink`,
    `DeepSkyBlue`,
    `DimGray`,
    `DimGrey`,
    `DodgerBlue`,
    `FireBrick`,
    `FloralWhite`,
    `ForestGreen`,
    `Fuchsia`,
    `Gainsboro`,
    `GhostWhite`,
    `Gold`,
    `GoldenRod`,
    `Gray`,
    `Grey`,
    `Green`,
    `GreenYellow`,
    `HoneyDew`,
    `HotPink`,
    `IndianRed`,
    `Indigo`,
    `Ivory`,
    `Khaki`,
    `Lavender`,
    `LavenderBlush`,
    `LawnGreen`,
    `LemonChiffon`,
    `LightBlue`,
    `LightCoral`,
    `LightCyan`,
    `LightGoldenRodYellow`,
    `LightGray`,
    `LightGrey`,
    `LightGreen`,
    `LightPink`,
    `LightSalmon`,
    `LightSeaGreen`,
    `LightSkyBlue`,
    `LightSlateGray`,
    `LightSlateGrey`,
    `LightSteelBlue`,
    `LightYellow`,
    `Lime`,
    `LimeGreen`,
    `Linen`,
    `Magenta`,
    `Maroon`,
    `MediumAquaMarine`,
    `MediumBlue`,
    `MediumOrchid`,
    `MediumPurple`,
    `MediumSeaGreen`,
    `MediumSlateBlue`,
    `MediumSpringGreen`,
    `MediumTurquoise`,
    `MediumVioletRed`,
    `MidnightBlue`,
    `MintCream`,
    `MistyRose`,
    `Moccasin`,
    `NavajoWhite`,
    `Navy`,
    `OldLace`,
    `Olive`,
    `OliveDrab`,
    `Orange`,
    `OrangeRed`,
    `Orchid`,
    `PaleGoldenRod`,
    `PaleGreen`,
    `PaleTurquoise`,
    `PaleVioletRed`,
    `PapayaWhip`,
    `PeachPuff`,
    `Peru`,
    `Pink`,
    `Plum`,
    `PowderBlue`,
    `Purple`,
    `Red`,
    `RosyBrown`,
    `RoyalBlue`,
    `SaddleBrown`,
    `Salmon`,
    `SandyBrown`,
    `SeaGreen`,
    `SeaShell`,
    `Sienna`,
    `Silver`,
    `SkyBlue`,
    `SlateBlue`,
    `SlateGray`,
    `SlateGrey`,
    `Snow`,
    `SpringGreen`,
    `SteelBlue`,
    `Tan`,
    `Teal`,
    `Thistle`,
    `Tomato`,
    `Turquoise`,
    `Violet`,
    `Wheat`,
    `White`,
    `WhiteSmoke`,
    `Yellow`,
    `YellowGreen`,
  ];

  onClickAdd(): void {
    const name = `Type ${this.defaultConfig.length + 1}`;
    const inputIndex = Math.floor(Math.random() * 100) + 1;
    this.defaultConfig.push({
      name,
      formconfig: this.setElementFormConfig(name, {
        name: { config: { header: 'Name', placeholder: 'Write Name' } },
        [`input${inputIndex}`]: { config: { header: `Input${inputIndex}`, placeholder: `Write input${inputIndex}` } },
      }),
    });
  }

  onDrop(event): void {
    const { currentIndex, previousIndex, container, previousContainer } = event || {};
    const previousContainerData = previousContainer.data || {};
    const containerData = container.data || {};
    const currentListIndex = this.defaultConfig.findIndex(el => el.name === containerData.name);
    const currentControlName = this.defaultConfig?.[currentListIndex]?.formconfig?.[currentIndex]?.formControlName ?? '';
    const previousListIndex = this.defaultConfig.findIndex(el => el.name === previousContainerData.name);
    const prevControlName = this.defaultConfig?.[previousListIndex]?.formconfig?.[previousIndex]?.formControlName ?? '';

    if (previousContainer?.id === container?.id && prevControlName !== 'name') {
      this.defaultConfig[currentListIndex].formconfig = arrayMove(
        this.defaultConfig[currentListIndex].formconfig,
        previousIndex,
        currentIndex
      );
    } else if (prevControlName !== currentControlName && prevControlName !== 'name') {
      const valuePrev = (this.form.get(toCamelCase(previousContainer.data.name)).get(prevControlName) as UntypedFormControl).value;
      const nameGroupPrev = this.form.get(toCamelCase(previousContainer.data.name)) as FormGroup;
      const nameGroupCurr = this.form.get(toCamelCase(container.data.name)) as FormGroup;
      const moveData = previousContainer.data.formconfig[previousIndex];
      nameGroupPrev.removeControl(prevControlName);
      nameGroupCurr.addControl(prevControlName, new UntypedFormControl(valuePrev));
      this.defaultConfig[previousListIndex].formconfig.splice(previousIndex, 1);
      this.defaultConfig[currentListIndex].formconfig.splice(currentIndex, 0, moveData);
    }

    console.log(this.defaultConfig);
    console.log(this.form.value);
  }

  setElementFormConfig(name: string, config: { [name: string]: IFormElements }): IFormElements[] {
    const nameControl = toCamelCase(name);
    this.form.addControl(nameControl, new FormGroup({}));
    for (const key of Object.keys(config)) {
      const nameGroup = this.form.get(nameControl) as FormGroup;
      nameGroup.addControl(key, new UntypedFormControl(null));
    }
    return setFormConfig(config);
  }

  getFormGroup(groupName: string, name: string): UntypedFormControl {
    const nameFormGroup = toCamelCase(groupName);
    return this.form.get(nameFormGroup).get(name) as UntypedFormControl;
  }

  getColor(index: number): string {
    return this.colors[index];
  }
}
