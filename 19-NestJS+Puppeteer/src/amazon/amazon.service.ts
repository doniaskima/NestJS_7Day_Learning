import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer-core';

@Injectable()
export class AmazonService {
  constructor(private readonly configService: ConfigService) {}

  async getProducts(products: string) {
    const browser = await puppeteer.connect({
      browserWSEndpoint: this.configService.getOrThrow('SBR_WS_ENDPOINT'),
    });
    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await Promise.all([
        page.waitForNavigation(),
        page.goto('https://amazon.com'),
      ]);
      await page.type('#twotabsearchtextbox', products);
      await Promise.all([
        page.waitForNavigation(),
        page.click('#nav-search-submit-button'),
      ]);
      return await page.$$eval(
        '.s-search-results .s-card-container',
        (resultItems) => {
          return resultItems.map((resultItem) => {
            const url = resultItem.querySelector('a').href;
            const title = resultItem.querySelector(
              '.s-title-instructions-style span',
            )?.textContent;
            const price = resultItem.querySelector(
              '.a-price .a-offscreen',
            ).textContent;
            return {
              url,
              title,
              price,
            };
          });
        },
      );
    } finally {
      await browser.close();
    }
  }
}
