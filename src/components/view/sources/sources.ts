import './sources.css';
import { checkForNull } from '../../../helpers/functions';
import { Subsource } from '../../../helpers/types';

class Sources {
    draw(data: Array<Subsource>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = checkForNull(document.querySelector('#sourceItemTemp'));
        const selectMenu: HTMLSelectElement = checkForNull(document.getElementById('select') as HTMLSelectElement | null);
        const menuValue: string = selectMenu.options[selectMenu.selectedIndex].value;

        data.forEach((item: Subsource): void => {
            if (!menuValue || item.language === menuValue) {
                const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

                if (sourceClone instanceof DocumentFragment) {
                
                    checkForNull(sourceClone.querySelector('.source__item-name')).textContent = item.name;
                    checkForNull(sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id as string);
                }

                fragment.append(sourceClone);
            }
        });

        const sources: Element = checkForNull(document.querySelector('.sources'));
        sources.innerHTML = '';
        sources.append(fragment);
    }
    
}

export default Sources;
