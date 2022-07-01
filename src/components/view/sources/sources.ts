import './sources.css';
import { Source } from '../../../types/index';

type htmlTempElementOrNull = HTMLTemplateElement | null;

class Sources {
    draw(data: Array<Source>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: htmlTempElementOrNull = document.querySelector('#sourceItemTemp');
        if (!sourceItemTemp) {
            throw new Error('Object is null');
        }

        data.forEach((item: Source) => {
            const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

            if (sourceClone instanceof DocumentFragment) {
                const sourceItemName: htmlTempElementOrNull = sourceClone.querySelector('.source__item-name');
                const sourceItem: htmlTempElementOrNull = sourceClone.querySelector('.source__item');
                if (!sourceItemName
                    || !sourceItem) {
                    throw new Error('Object is null');
                }
                sourceItemName.textContent = item.name;
                sourceItem.setAttribute('data-source-id', item.id as string);
            }

            fragment.append(sourceClone);
        });

        const sources: Element | null = document.querySelector('.sources');
        if (!sources) {
            throw new Error('Object is null');
        }
        sources.append(fragment);
    }
    
}

export default Sources;
