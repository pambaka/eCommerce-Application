import ProfileSection from '../logic/logic-profile';
import BaseComponent from '../../../components/base-component';

export default function renderProfilePage(): HTMLElement {
  const wrapper = new BaseComponent('section', 'profile-page');
  const profileSection = new ProfileSection();
  wrapper.node.appendChild(profileSection.node);

  return wrapper.node;
}
