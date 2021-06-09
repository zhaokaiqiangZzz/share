import { Component, OnInit } from '@angular/core';
import { Page } from '../../common/page';
import { Post } from '../../entity/post';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { JobService } from '../../service/job.service';
import { CommonService } from '../../service/common.service';
import { stringToIntegerNumber } from '../../common/utils';
import { config } from '../../conf/app.config';
import { CompetitionService } from '../../service/competition.Service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  pageData = {} as Page<Post>;

  imageApi = environment.imageUrl + '/';

  private params: Params;

  constructor(private competitionService: CompetitionService,
              private route: ActivatedRoute,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.params = params;
      this.competitionService.page(
        stringToIntegerNumber(params.page, 0),
        stringToIntegerNumber(params.size, config.size)).subscribe(data => {
        this.pageData = data;
      });

    });
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page}});
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    this.commonService.reloadByParam(params).then();
  }
}
