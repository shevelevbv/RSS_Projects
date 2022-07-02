import './sources.css';
import { Source } from '../../../helpers/interfaces';
import { Errors } from '../../../helpers/enums';
import { HtmlTempElementOrNull } from '../../../helpers/types';

class Sources {
    draw(data: Array<Source>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HtmlTempElementOrNull = document.querySelector('#sourceItemTemp');
        if (!sourceItemTemp) {
            throw new Error(Errors.isNull);
        }

        data.forEach((item: Source) => {
            console.log(item);
            const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

            if (sourceClone instanceof DocumentFragment) {
                const sourceItemName: HtmlTempElementOrNull = sourceClone.querySelector('.source__item-name');
                const sourceItem: HtmlTempElementOrNull = sourceClone.querySelector('.source__item');
                if (!sourceItemName
                    || !sourceItem) {
                    throw new Error(Errors.isNull);
                }
                sourceItemName.textContent = item.name;
                sourceItem.setAttribute('data-source-id', item.id as string);
            }

            fragment.append(sourceClone);
        });

        const sources: Element | null = document.querySelector('.sources');
        if (!sources) {
            throw new Error(Errors.isNull);
        }
        sources.append(fragment);
    }
    
}

export default Sources;
