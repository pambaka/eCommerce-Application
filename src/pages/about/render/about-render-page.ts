import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import BaseImageComponent from '../../../components/base-image-component';
import aboutIcon from '../../../assets/footer-icons-sprite.svg';
import LinkImage from '../../../components/link-image';

export default class AboutSection extends BaseComponent {
  constructor() {
    super('section', 'about_page');
    this.renderAboutSection();
  }

  renderAboutSection() {
    const wrapper = new BaseComponent('div', 'about_page__wrapper');

    const aboutImage = new BaseImageComponent(
      'about-image',
      'https://www.svgrepo.com/show/530291/leaves-2.svg',
      'about-image',
    );
    const title = new BaseTextComponent('h1', 'about_page__title', 'Our development team');
    const subtitle = new BaseTextComponent(
      'p',
      'subtitle',
      'Our development team strives to be the best specialists in their field. Keep your peace of mind with us!',
    );

    wrapper.node.append(title.node, aboutImage.node, subtitle.node);

    const teamList = new BaseComponent('ul', 'about-team');

    const teamMembers = [
      {
        imgSrc:
          'https://s3-alpha-sig.figma.com/img/8bc0/e6fb/f5ad56664fb09f937ce07331f24012f5?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BHUmSjSBm4CubwZSsxBFccKoKqs3tlv0NCzt4G0ah2cEJWNcpXJ7bOYCOkRCN5KgkUQ7JsGZLPrzJFBaGfqHL7fJp1rghlS-6YHiPMbvN6yb4ffmLJ8YG~UI39~e-DJ35sEgtUywZ2mSYMJ1JGkYjBD9OXVHkVuxqAaa5NJmF~d76~Zkj3bjvyYPr05dbVFI233owQAwP7zBxLl20vpuH8HotnBVeiJQWEy0KgEjyhx4mIzYKLpruUTvq~qSue6YpDwcmXtASnLPFPv1AD8D7-IRd2~ZkIHCwhI81bs8yQzpMv5kfrepLDkVayp7CDU4Xt1InelXKL3ErAeZAVdWmA__',
        imgAlt: 'Tanya Telegina',
        name: 'Tanya Telegina',
        role: 'Lead Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br><br><b>Contribution to the project:</b><br> - GitHub repository administration<br> - Sign In page<br> - Routing settings<br> - Product page layout<br> - Catalog sort and filter algorithms implementation<br> - User interaction with cart from catalog page',
        github: 'https://github.com/pambaka',
      },
      {
        imgSrc:
          'https://s3-alpha-sig.figma.com/img/f621/bdda/75dfbf7614cbd47aad1ee78575594fcd?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IN0Ng2IGGXOv39Dsf52TLmmTL81K4A2Us17uyKDYBPRd6WwQUfDmjbXYnKjeUZ2fvJDDml32f93luVaXb1yOfZcBe-BckW9HmtMJPqNdDn81FgCFPfnLl~KdoN53Cba577ogrlPTHa~Z2ZOdZhC0BK2oGv4ti74104AFd5t~PZO-ivOlRSHaYaODM-W3eXFK7-JR-e2q6g882Au9YQe1wJccTNApJpNSpV5taCfvLLUMClarraPBFBYuGY9aKhgxlciDocjYqUiODMPXkp4B-XR72O17eZ~k~HjE4IUE-jlD9d2aTb2hrG599TPCSLoiWW8jY4wKF5prLnTDRmNt3Q__',
        imgAlt: 'Artyom Pavlushov',
        name: 'Artyom Pavlushov',
        role: 'Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br><br><b>Contribution to the project:</b><br> - API Client Setup<br> - CommerceTools administration<br> - Development environment configurement<br> - Sign Up page layout<br> - Cart page layout<br> - Display, modify and remove products in cart',
        github: 'https://github.com/gunsnfnr',
      },
      {
        imgSrc:
          'https://s3-alpha-sig.figma.com/img/23e6/0144/b7caabc004af4808d3d8a5529ce2e2b5?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pflHrXzqWTwcECxlW2VjuiiDGnAFOe2Ix7Olp1TDpoPx3iB4rx~yV6S7Dp3s0IhqS7zze74P-Xh0PpM4P48GAYW2rc~vHVzftXK29mYgC4f~iVBkqqfiIbkXqXNEkS7K1SFi27kKirWkri-ta3V3Bj~2kRYeTAakrgU2BqkCXcqK7xBrEZcgz6Ecx5cXPsfDl8RMpz83GNnjzGOh2HtwflrF-oybVmrnyzFkHyEEzx5hc73--zsbZk8L2qRJGak7Hm1g2Bskf112~0b40O~PDG3v9aynp8MDAlkpxJch6pxsUsaTk6UccUZvTXUqiqmwIjl4nRCn2jT9U8OQOQvKcg__',
        imgAlt: 'Tamara Maltseva',
        name: 'Tamara Maltseva',
        role: 'Developer',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br><br><b>Contribution to the project:</b><br> - About Us page layout<br> - Main page layout<br> - 404 page layout<br> - Profile page layout and edit mode<br> - Routing implementation<br> - General design & responsive layout',
        github: 'https://github.com/TMaltseva',
      },
    ];

    teamMembers.forEach((member) => {
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
