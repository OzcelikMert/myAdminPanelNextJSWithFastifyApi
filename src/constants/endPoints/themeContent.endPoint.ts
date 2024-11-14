import { EndPoints } from '@constants/endPoints/index';
import { PostEndPoint } from '@constants/endPoints/post.endPoint';
import { PostTypeId } from '@constants/postTypes';
import { PathUtil } from '@utils/path.util';

export class ThemeContentEndPoint {
  private mainPath: string;

  constructor(mainPath = EndPoints.THEME_CONTENT) {
    this.mainPath = mainPath;
  }

  get BLOG() {
    return PathUtil.createPath(this.mainPath, EndPoints.POST(PostTypeId.Blog));
  }
  get BLOG_WITH() {
    return new PostEndPoint(this.BLOG);
  }

  get PORTFOLIO() {
    return PathUtil.createPath(
      this.mainPath,
      EndPoints.POST(PostTypeId.Portfolio)
    );
  }
  get PORTFOLIO_WITH() {
    return new PostEndPoint(this.PORTFOLIO);
  }

  get SLIDER() {
    return PathUtil.createPath(
      this.mainPath,
      EndPoints.POST(PostTypeId.Slider)
    );
  }
  get SLIDER_WITH() {
    return new PostEndPoint(this.SLIDER);
  }

  get REFERENCE() {
    return PathUtil.createPath(
      this.mainPath,
      EndPoints.POST(PostTypeId.Reference)
    );
  }
  get REFERENCE_WITH() {
    return new PostEndPoint(this.REFERENCE);
  }

  get SERVICE() {
    return PathUtil.createPath(
      this.mainPath,
      EndPoints.POST(PostTypeId.Service)
    );
  }
  get SERVICE_WITH() {
    return new PostEndPoint(this.SERVICE);
  }

  get TESTIMONIAL() {
    return PathUtil.createPath(
      this.mainPath,
      EndPoints.POST(PostTypeId.Testimonial)
    );
  }
  get TESTIMONIAL_WITH() {
    return new PostEndPoint(this.TESTIMONIAL);
  }

  get BEFORE_AND_AFTER() {
    return PathUtil.createPath(
      this.mainPath,
      EndPoints.POST(PostTypeId.BeforeAndAfter)
    );
  }
  get BEFORE_AND_AFTER_WITH() {
    return new PostEndPoint(this.BEFORE_AND_AFTER);
  }
}
