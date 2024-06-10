import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import BaseImageComponent from '../../../components/base-image-component';
import aboutIcon from '../../../assets/footer-icons-sprite.svg';
import LinkImage from '../../../components/link-image';
import TeamMember from '../../../types/members';
import teamMembers from './members-information';

export default class AboutSection extends BaseComponent {
  constructor() {
    super('section', 'about_page');
    this.renderAboutSection();
  }

  renderAboutSection() {
    const wrapper = new BaseComponent('div', 'about_page__wrapper');

    const title = new BaseTextComponent('h1', 'about_page__title', 'Our development team');
    const subtitle = new BaseTextComponent(
      'p',
      'subtitle',
      'Our development team strives to be the best specialists in their field. Keep your peace of mind with us!',
    );

    wrapper.node.append(title.node, subtitle.node);

    const teamList = new BaseComponent('ul', 'about-team');

    teamMembers.forEach((member: TeamMember) => {
      const listItem = new BaseComponent('li', 'teammate');

      const img = new BaseImageComponent('teammate-image', member.imgSrc, member.imgAlt);
      const infoDiv = new BaseComponent('div', 'info');
      const name = new BaseTextComponent('p', 'teammate_title', member.name);
      const roleContainer = new BaseComponent('div', 'role-container');
      const role = new BaseTextComponent('div', 'subtitle-small', member.role);
      const aboutImg = new BaseImageComponent(
        'about-image',
        'https://www.svgrepo.com/show/515395/calm.svg',
        'about-image',
      );
      roleContainer.node.append(aboutImg.node, role.node);
      const bio = new BaseComponent('p', 'bio');
      bio.node.innerHTML = member.bio;

      const githubLink = new BaseComponent('a', 'gh-link');
      githubLink.node.setAttribute('href', member.github);
      githubLink.node.setAttribute('target', '_blank');
      const githubIcon = new LinkImage(member.github, `${aboutIcon}#github`);
      githubLink.node.append(githubIcon.node);

      infoDiv.node.append(name.node, roleContainer.node, bio.node, githubLink.node);
      listItem.node.append(img.node, infoDiv.node);
      teamList.node.append(listItem.node);
    });

    wrapper.node.append(teamList.node);

    const rssDiv = new BaseComponent('div', 'rss');
    const rssSubtitleStart = new BaseTextComponent('span', 'subtitle', 'All gratitude to   ');
    const rssLink = new BaseComponent('a', 'link');
    rssLink.node.setAttribute('href', 'https://rs.school/js/');
    rssLink.node.setAttribute('target', '_blank');
    const rssImg = new LinkImage('https://rs.school/', `${aboutIcon}#rss`);
    const rssSubtitleEnd = new BaseTextComponent('span', 'subtitle', '   School!');

    rssLink.node.append(rssImg.node);
    rssSubtitleStart.node.append(rssLink.node, rssSubtitleEnd.node);
    rssDiv.node.appendChild(rssSubtitleStart.node);

    wrapper.node.append(rssDiv.node);

    this.node.appendChild(wrapper.node);
  }
}
