import 'package:flutter/material.dart';
import '../models/syllabus_model.dart';
import '../services/syllabus_service.dart';

class SyllabusProvider extends ChangeNotifier {
  final _svc = SyllabusService();

  List<Subject> _subjects    = [];
  bool          _loaded      = false;
  String?       _error;

  List<Subject> get subjects => _subjects;
  bool          get loaded   => _loaded;
  String?       get error    => _error;

  List<Subject> byClass(String classLevel) =>
      _subjects.where((s) => s.classLevel == classLevel && s.isActive).toList();

  int get plus1Count => byClass('+1').length;
  int get plus2Count => byClass('+2').length;

  Future<void> loadIfNeeded() async {
    if (_loaded) return;
    await load();
  }

  Future<void> load() async {
    _error = null;
    try {
      _subjects = await _svc.getSubjects();
      _loaded   = true;
    } catch (e) {
      _error = e.toString();
    }
    notifyListeners();
  }
}
