package mk.server.rentacar.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.io.IOException;

public class CarImageScraper {
    public static String getImageLink(String brand, String model) {
        String searchUrl = "https://www.netcarshow.com/search.htm?q=" + brand + "+" + model;

        try {
            Document document = Jsoup.connect(searchUrl).get();
            Element imageElement = document.getElementsByClass("swIC").get(10);

            return imageElement.absUrl("src");
        } catch (IndexOutOfBoundsException | IOException e) {
            return null;
        }
    }
}
