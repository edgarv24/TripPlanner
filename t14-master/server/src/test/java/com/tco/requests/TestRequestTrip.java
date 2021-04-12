package com.tco.requests;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestRequestTrip {
  private RequestTrip requestTrip;
  Map<String, String> options;
  List<Map<String, String>> places;

  @BeforeEach
  public void createConfigurationForTests() {
    options = new HashMap<>();
    options.put("title", "My Trip");
    options.put("earthRadius", "3959.0");
    options.put("response", "0.0");

    places = new ArrayList<>();
    Map<String, String> placesEntry1 = new HashMap<>();
    placesEntry1.put("name", "Denver");
    placesEntry1.put("latitude", "39.7");
    placesEntry1.put("longitude", "-105.0");

    Map<String, String> placesEntry2 = new HashMap<>();
    placesEntry2.put("name", "Boulder");
    placesEntry2.put("latitude", "40.0");
    placesEntry2.put("longitude", "-105.4");

    Map<String, String> placesEntry3 = new HashMap<>();
    placesEntry3.put("name", "Fort Collins");
    placesEntry3.put("latitude", "40.6");
    placesEntry3.put("longitude", "-105.1");

    places.add(placesEntry1);
    places.add(placesEntry2);
    places.add(placesEntry3);

    requestTrip = new RequestTrip(options, places);
  }

  @Test
  @DisplayName("Request type is \"find\"")
  public void testType() {
    String type = requestTrip.getRequestType();
    assertEquals("trip", type);
  }

  @Test
  @DisplayName("Version number is equal to 4")
  public void testVersion() {
    int version = requestTrip.getRequestVersion();
    assertEquals(4, version);
  }

  @Test
  @DisplayName("Testing constructor")
  public void testConstructor() {
    assertEquals(options, requestTrip.getOptions());
    assertEquals(places, requestTrip.getPlaces());
  }

  @Test
  @DisplayName("Testing distance list with given CO trip")
  public void testCorrectDistanceList() {
    List<Long> results = Arrays.asList(30L, 44L, 62L);
    requestTrip.buildResponse();
    assertEquals(3, requestTrip.getDistances().size());
    assertEquals(results, requestTrip.getDistances());
  }

  @Test
  @DisplayName("Testing for two identical places return [0,0]")
  public void testSameLocations() {
    places.remove(2);
    places.remove(1);
    Map<String, String> denver = new HashMap<>();
    denver.put("name", "Denver");
    denver.put("latitude", "39.7");
    denver.put("longitude", "-105.0");

    places.add(denver);
    requestTrip = new RequestTrip(options, places);
    requestTrip.buildResponse();
    List<Long> results = Arrays.asList(0L, 0L);
    assertEquals(2, requestTrip.getDistances().size());
    assertEquals(results, requestTrip.getDistances());
  }

  @Test
  @DisplayName("Testing with earthRadius in feet and delta being 100ft")
  public void testBigEarthRadius() {
    options.clear();
    options.put("title", "My Trip");
    options.put("earthRadius", "20902230");
    options.put("response", "0.0");
    requestTrip = new RequestTrip(options, places);
    requestTrip.buildResponse();
    List<Long> results = Arrays.asList(156604L, 234273L, 329472L);

    assertEquals(results.get(0), requestTrip.getDistances().get(0), 100.0);
    assertEquals(results.get(1), requestTrip.getDistances().get(1), 100.0);
    assertEquals(results.get(2), requestTrip.getDistances().get(2), 100.0);
  }

  @Test
  @DisplayName("Testing with earthRadius in millimeters and delta being 100ft")
  public void testSmallEarthRadius() {
    options.clear();
    options.put("title", "My Trip");
    options.put("earthRadius", "6371008771");
    options.put("response", "0.0");
    requestTrip = new RequestTrip(options, places);
    requestTrip.buildResponse();
    List<Long> results = Arrays.asList(47733143L, 71406593L, 100420000L);

    assertEquals(results.get(0), requestTrip.getDistances().get(0), 30480);
    assertEquals(results.get(1), requestTrip.getDistances().get(1), 30480);
    assertEquals(results.get(2), requestTrip.getDistances().get(2), 30480);
  }

  @Test
  @DisplayName("Testing with one place provided")
  public void testOnePlaceGiven() {
    places.remove(2);
    places.remove(1);
    assertEquals(1, places.size());

    requestTrip = new RequestTrip(options, places);
    requestTrip.buildResponse();
    List<Long> results = Collections.singletonList(0L);
    assertEquals(results, requestTrip.getDistances());
  }

  @Test
  @DisplayName("Testing with no place provided")
  public void testNoPlaceGiven() {
    places.clear();
    requestTrip = new RequestTrip(options, places);
    requestTrip.buildResponse();
    assertTrue(requestTrip.getDistances().isEmpty());
  }
}
