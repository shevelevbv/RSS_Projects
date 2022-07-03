import './sources.css';
import { Source } from '../../../helpers/interfaces';
import { Errors } from '../../../helpers/enums';
import { checkForNull } from '../../../helpers/functions';

class Sources {
    draw(data: Array<Source>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = checkForNull(document.querySelector('#sourceItemTemp'));
        if (!sourceItemTemp) {
            throw new Error(Errors.isNull);
        }

        data.forEach((item: Source) => {
            console.log(item);
            const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

            if (sourceClone instanceof DocumentFragment) {
                
                checkForNull(sourceClone.querySelector('.source__item-name')).textContent = item.name;
                checkForNull(sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id as string);
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
